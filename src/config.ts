export const Config = Object.freeze({
  port: Number(process.env.PORT || 3333),

  slack: {
    token: process.env.SLACK_TOKEN!,
    botUserId: process.env.SLACK_BOT_USER_ID!,
  },

  naver: {
    clientId: process.env.NAVER_CLIENT_ID!,
    clientSecret: process.env.NAVER_CLIENT_SECRET!,
  },
});
