import dotenv from "dotenv";
import {App} from "octokit";
import {createNodeMiddleware} from "@octokit/webhooks";
import fetch from 'node-fetch';
import http from "http";

dotenv.config();

const appId = process.env.APP_ID;
const webhookSecret = process.env.WEBHOOK_SECRET;
const privateKey = process.env.PRIVATE_KEY_PATH;

const app = new App({
  appId: appId,
  privateKey: privateKey,
  webhooks: {
    secret: webhookSecret
  },
});

async function handlePullRequestOpened({octokit, payload}) {
  console.log(`Received a pull request event for #${payload.pull_request.number}`);
  let comment = payload.pull_request.body?.split(" ").map(String) || ""
  let commitmsg = payload.pull_request.title?.split(" ").map(String) || ""
  

  if(comment.includes("/execute") || commitmsg.includes("/execute")){
    let res = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "language": "javascript",
            "version": "18.15.0",
            "runtime": "node",
            "files": [
                {
                    "name": "my_cool_code.js",
                    "content": "console.log('oh')"
                }
            ]
          })
    })

    res = await res.json();
    try {
        await octokit.request("POST /repos/{owner}/{repo}/issues/{issue_number}/comments", {
          owner: payload.repository.owner.login,
          repo: payload.repository.name,
          issue_number: payload.pull_request.number,
          body: `Output for our request is => ${res.run.output}`,
          headers: {
            "x-github-api-version": "2022-11-28",
          },
        });
      } catch (error) {
        if (error.response) {
          console.error(`Error! Status: ${error.response.status}. Message: ${error.response.data.message}`)
        }
        console.error(error)
      }
  }
  
};

app.webhooks.on("pull_request.opened", handlePullRequestOpened);

app.webhooks.onError((error) => {
  if (error.name === "AggregateError") {
    console.error(`Error processing request: ${error.event}`);
  } else {
    console.error(error);
  }
});

const port = 3000;
const host = 'localhost';
const path = "/api/webhook";
const localWebhookUrl = `http://${host}:${port}${path}`;

const middleware = createNodeMiddleware(app.webhooks, {path});

http.createServer(middleware).listen(port, () => {
  console.log(`Server is listening for events at: ${localWebhookUrl}`);
  console.log('Press Ctrl + C to quit.')
});
