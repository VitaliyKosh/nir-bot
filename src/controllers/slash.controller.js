import TelegramBot from 'node-telegram-bot-api';
import { getSlashInfo } from '../bot/lib/get-slash-info.js';
import { SessionService } from '../services/session.service.js';
import { SystemService } from '../services/system.service.js';

export class SlashController {
  sessionService

  /**
   * @param {SessionService} sessionService
   */
  constructor (sessionService) {
    this.sessionService = sessionService
  }

  /**
   * @param {TelegramBot} bot
   * @param {TelegramBot.Message} message 
   */
  start (bot, message) {
    const chatId = message.chat.id

    this.sessionService.deleteSession(chatId);

    bot.sendMessage(chatId, `Если вы хотите рассчитать среднее время ответа от количества запросов напишите /calculate`);
  }

  /**
   * @param {TelegramBot} bot
   * @param {TelegramBot.Message} message 
   */
  calculate (bot, message) {
    const chatId = message.chat.id

    this.sessionService.createSession(chatId);

    this.sessionService.updateSession(chatId, {
      stage: this.sessionService.STAGES.SYSTEM_NUMBER
    })

    bot.sendMessage(chatId, `Выберите систему, для которой вы хотите рассчитать среднее время ответа и введите ее номер:\n${SystemService.SYSTEMS.map((s, i) => `\t\t\t\t${i + 1}. ${s.title}\n\t\t\t\t${s.description}\n\n`).join('')}`);
  }

  /**
   * @param {TelegramBot} bot
   * @param {TelegramBot.Message} message 
   */
  notMatch (bot, message) {
    const chatId = message.chat.id

    bot.sendMessage(chatId, `Если вы хотите рассчитать среднее время ответа от количества запросов напишите /calculate`);
  }
}