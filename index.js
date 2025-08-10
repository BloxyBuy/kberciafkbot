const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

let jumpInterval;

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
    host: '185.107.194.197', // Server IP
    port: 61860, // Server port
    username: 'KBerciAFKBot', // Cracked username
    auth: 'offline'
  });

  bot.on('login', () => {
    console.log(`Logged in as ${bot.username}`);
    startJumpLoop(bot);
  });

  bot.on('end', (reason) => {
    clearInterval(jumpInterval);
    console.log(`Bot disconnected (${reason || "no reason"}), reconnecting in 10s...`);
    setTimeout(startBot, 10000);
  });

  bot.on('error', (err) => {
    console.error(`Bot error: ${err}`);
  });

  bot.on('kicked', (reason, loggedIn) => {
    console.log(`Bot kicked: ${reason}`);
  });
}

function startJumpLoop(bot) {
  jumpInterval = setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => {
      bot.setControlState('jump', false);
    }, 500);
  }, 10000); // Jump every 10 seconds
}
