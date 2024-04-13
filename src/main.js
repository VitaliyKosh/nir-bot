import TelegramBot from 'node-telegram-bot-api';
import { $router } from './router/message.router.js';
import { Bot } from './bot/bot.js';
import dotenv from 'dotenv'

dotenv.config(); 

const bot = new TelegramBot(process.env.API_KEY_BOT, {
  polling: true
});

const $bot = new Bot(bot);
$bot.setMessageRouter($router);