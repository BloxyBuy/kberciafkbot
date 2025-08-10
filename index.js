const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

let jumpInterval; // store interval so we can clear it

// Simple web server for uptime checks
app.get('/', (req, res) => {
  res.send('AFK Bot made by KBerci. Subscribe to KBerci on YouTube.');
});

app.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
  startBot();
});

function startBot() {
  const bot = mineflayer.createBot({
    host: '185.107.194.197',   // Server IP
    port: 61860,               // Server port
    username: 'KBerciAFKBot',  // Offline username
    auth: 'offline'
  });

  bot.on('login', () => {
    console.log(`Logged in as ${bot.username}`);
    startJumpLoop(bot);
  });

  bot.on('spawn', () => {
    console.log('Bot spawned in the world.');
  });

  bot.on('end', () => {
    clearInterval(jumpInterval);
    console.log("Bot disconnected, reconnecting in 10s...");
    setTimeout(startBot, 10000);
  });

  bot.on('kicked', (reason, loggedIn) => {
    console.log(`Bot kicked: ${reason} | Logged in: ${loggedIn}`);
  });

  bot.on('error', (err) => {
    console.error(`Bot error: ${err}`);
  });
}

function startJumpLoop(bot) {
  clearInterval(jumpInterval); // make sure old interval is cleared
  jumpInterval = setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => {
      bot.setControlState('jump', false);
    }, 500);
  }, 10000); // every 10 seconds
}
