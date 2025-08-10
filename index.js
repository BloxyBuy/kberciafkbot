const mineflayer = require('mineflayer');
const { SocksClient } = require('socks');

async function createBot() {
  const info = await SocksClient.createConnection({
    proxy: {
      host: '8.212.151.166',
      port: 1024,
      type: 4
    },
    command: 'connect',
    destination: {
      host: 'kbercismp1.aternos.me',
      port: 61860
    }
  });

  const bot = mineflayer.createBot({
    username: 'KBerciAFKBot',
    auth: 'offline',
    stream: info.socket
  });

  bot.on('login', () => console.log('Bot logged in through SOCKS4 proxy!'));
  bot.on('error', err => console.error('Bot error:', err));
  bot.on('end', () => console.log('Bot disconnected'));
}

createBot();


