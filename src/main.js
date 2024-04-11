import TelegramBot from 'node-telegram-bot-api';
import { $router } from './router/message.router.js';
import { Bot } from './bot/bot.js';

const API_KEY_BOT = '7007641309:AAH66lp5YWih0xbz4ArtwrqwhX_im3J0c_E';

const bot = new TelegramBot(API_KEY_BOT, {
  polling: true
});

const $bot = new Bot(bot);
$bot.setMessageRouter($router);