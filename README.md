# GitHub App - Code Execution and Feedback

This GitHub App allows users to trigger code execution and receive feedback on their pull requests. It integrates with the GitHub repository and automatically executes the code provided in the pull request. The output or results of the executed code are then posted as comments in the pull request.

## Project Description

This project is a GitHub App that leverages the Piston API for code execution. When a user creates a pull request in their repository, they can include the command "/execute" in the pull request comments or commit messages. Upon detecting this command, the GitHub App triggers the execution of the code using the Piston API. The output of the code execution is captured and posted as a comment on the pull request, providing immediate feedback to the user.

## Features

- Automated code execution upon pull request creation
- Integration with the GitHub repository
- Use of the Piston API for code execution
- Posting the code execution output as comments on the pull request
- Easy setup and configuration

## Setup Instructions

1. Install Node.js and npm on your machine.
2. Clone this repository to your local machine or GitHub Codespaces.
3. Install the project dependencies by running `npm install` in the project directory.
4. Configure the required environment variables by creating a `.env` file based on the `.env.example` file provided.
5. Update the `APP_ID`, `WEBHOOK_SECRET`, `PRIVATE_KEY_PATH`, and other relevant variables in the `.env` file with your own values.
6. Start the server by running `node app.js` in the project directory.
7. Create a new GitHub App with the provided settings outlined in the README.
8. Configure the webhook URL of your GitHub App to point to the URL where your server is running.
9. Grant your GitHub App access to the repositories where you want to enable code execution and feedback.
10. Start creating pull requests and include the command "/execute" in the pull request comments or commit messages to trigger code execution and receive feedback.

## Technologies Used

- Node.js
- Express.js
- Piston API
- GitHub API

# summary
### Approach Taken:
The initial approach involved understanding the requirements, breaking down the tasks, and implementing the necessary components:
### Challenges Faced:
One of the primary challenges was configuring the webhook and ensuring the GitHub App received webhook events correctly.

### Improvement:
Improving the code execution mechanism to use the code from the repository in the pull request would be a significant enhancement. Instead of relying on console.log statements, extracting and executing the code directly from the pull request's repository would provide more accurate and practical results. 

[![Video link](https://drive.google.com/file/d/1UgR0VEetHRcpE77at_bDy9Q_9co04pju/view?usp=sharing)](https://drive.google.com/file/d/1UgR0VEetHRcpE77at_bDy9Q_9co04pju/view?usp=sharing)

<video width="640" height="480" controls>
  <source src="https://drive.google.com/file/d/1UgR0VEetHRcpE77at_bDy9Q_9co04pju/view?usp=sharing" type="video/mp4">
</video>







