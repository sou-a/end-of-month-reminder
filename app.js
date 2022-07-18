require("dotenv").config();
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000,
});

const months = [
  { name: "January", lastDay: 31 },
  { name: "February", lastDay: 28 },
  { name: "March", lastDay: 31 },
  { name: "April", lastDay: 30 },
  { name: "May", lastDay: 31 },
  { name: "June", lastDay: 30 },
  { name: "July", lastDay: 31 },
  { name: "August", lastDay: 31 },
  { name: "September", lastDay: 30 },
  { name: "October", lastDay: 31 },
  { name: "November", lastDay: 30 },
  { name: "December", lastDay: 31 },
];

app.event("message", async ({ message, client, say }) => {
  months.forEach(async (month) => {
    await client.reminders.add({
      text: message.text,
      time: `on the ${month.lastDay}st of every ${month.name}`,
      token: process.env.SLACK_USER_TOKEN,
    });
  });
  await say(`リマインドしました！:memo:`);
});

(async () => {
  await app.start();
  console.log("⚡️ Bolt app is running!");
})();
