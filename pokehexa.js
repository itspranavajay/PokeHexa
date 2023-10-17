const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();
const moment = require('moment');
const fs = require('fs');
const fse = require('fs-extra');



const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('Bot started! Type /help to see the available commands.');
});

bot.command('help', (ctx) => {
  const helpMessage = `
    Welcome to the botname
    
    **Controls**
    /a - Presses A
    /b - Presses B
    /l - Presses R
    /r - Presses L
    /start - Presses START
    /select - Presses SELECT
    /up - Presses UP
    /down - Presses DOWN
    /left - Presses LEFT
    /right - Presses RIGHT
    /screen - Shows the current screen
    /help - Shows this help message
  `;
  ctx.reply(helpMessage);
});

bot.command(['a', 'b', 'l', 'r', 'start', 'select', 'up', 'down', 'left', 'right'], (ctx) => {
  const command = ctx.message.text.substr(1); // Remove the leading slash
  // Process the command and update the screen
  updateScreen(0, ctx, true);
});

bot.command('screen', (ctx) => {
  updateScreen(0, ctx, false);
});

function updateScreen(idx, ctx, d) {
  var delay = 500;
  if (d) {
    delay = 1250;
  }
  setTimeout(() => {
    var png = gba.screenshot();
    png.pack().pipe(fs.createWriteStream('gba' + idx + '.png'));
    setTimeout(() => {
      ctx.replyWithPhoto({ source: './hexa.png' }, { caption: 'Current Screen' });
    }, 250);
  }, delay);
}

bot.launch();
