const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Simple web server for UptimeRobot
app.get('/', (req, res) => {
  res.send('Bot is running');
});

app.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
  startBot();
});

function startBot() {
  const bot = mineflayer.createBot({
    host: '185.107.194.197',     // e.g. play.example.com
    port: 61860,           // default is 25565
    username: 'KBerciAFKBot',  // cracked username
    auth: 'offline'
  });

  bot.on('login', () => {
    console.log(`Logged in as ${bot.username}`);
    startJumpLoop(bot);
  });

  bot.on('end', () => {
    console.log("Bot disconnected, reconnecting in 10s...");
    setTimeout(startBot, 10000);
  });

  bot.on('error', (err) => {
    console.error(`Bot error: ${err}`);
  });
}

function startJumpLoop(bot) {
  setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => {
      bot.setControlState('jump', false);
    }, 500);
  }, 10000); // jump every 10 seconds
}
