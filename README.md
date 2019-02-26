# Nexmo Demo: SMS Code Flow

- [Nexmo Demo: SMS Code Flow](#nexmo-demo-sms-code-flow)
  - [Get a Nexmo Number](#get-a-nexmo-number)
  - [Run Locally](#run-locally)
  - [Deploy Application](#deploy-application)
  - [Configure the Nexmo Number Callback](#configure-the-nexmo-number-callback)

---

## Get a Nexmo Number

You can [buy a Nexmo number here][1]. This is required for deployment and testing locally.

## Run Locally

To run locally, run this command.

```bash
NEXMO_NUMBER=<your-nexmo-number> npm run dev
``` 

This will start both the client and server. You can access the app at [localhost:3000][4]

## Deploy Application

You can deploy to your own Heroku instance using this button.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)][2]

## Configure the Nexmo Number Callback

The callback endpoint is expecting POST-JSON which can be set in the [account level settings][3]. Configure the webhook for your number to go to `https://<your-app-name>.herokuapp.com/api`.

[1]: <https://dashboard.nexmo.com/your-numbers>
[2]: <https://heroku.com/deploy>
[3]: <https://dashboard.nexmo.com/settings>
[4]: <http://localhost:3000>
