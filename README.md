# Papago-slack

![Imgur](https://imgur.com/fEfvqXl.png)
✌
️

## Installation

### MUST READ: This bot only works with classic Apps in Slack!

Use the link below to create a new classic bot, but DO NOT click the button to switch to granular permissions! Switching to granular permissions will effectively upgrade the classic bot to a modern Slack bot and you'll have to start over.

https://api.slack.com/apps?new_classic_app=1

1. Create a new classic Bot App.
2. Navigate to 'OAuth & Permissions' and then set the following scopes:

- `bot`
- `chat:write:bot` (Send messages with `chat.postMessage`.)
- `channels:read`

3. Go to 'App Home' and then set the app's username and display name.
4. Install the app and get a bot user token, begins with `xoxb-`.
5. Open the Slack app. Click the bot user to see bot user's details. And by right-click on username > Copy link, you will get the bot user id from the link copied: `https://your-workspace.slack.com/team/U**********` -> `U**********`.
6. Create a `.env` file or set environment variables directly. File the env vars with your credentials. Note that you also need NAVER credentials to use the Papago API:

```
SLACK_TOKEN='Bot user token'
SLACK_BOT_USER_ID='Bot user id'
NAVER_CLIENT_ID=''
NAVER_CLIENT_SECRET=''
```

Get your Papago API credentials at https://developers.naver.com/apps/. (Papago 번역, Papago 언어감지)

7. Install dependencies of the project and compile: `yarn && npx tsc`
8. Start: `node dist/app`
