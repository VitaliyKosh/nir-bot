import TelegramBot from 'node-telegram-bot-api';
import { SessionService } from '../services/session.service.js';
import { SystemService } from '../services/system.service.js';

export class TextController {
  sessionService
  ERROR_MESSAGE = `Если вы хотите рассчитать среднее время ответа от количества запросов напишите /calculate`

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
  text (bot, message) {
    const chatId = message.chat.id
    const session = this.sessionService.getSession(chatId);

    if (!session) {
      bot.sendMessage(chatId, this.ERROR_MESSAGE);
      return;
    }

    switch (session.stage) {
      case this.sessionService.STAGES.SYSTEM_NUMBER:
        this.indexOfSystem(bot, message); break;
      case this.sessionService.STAGES.REQUEST_COUNT:
        this.requestCount(bot, message); break;
      default:
        break;
    }
  }

  /**
   * @param {TelegramBot} bot
   * @param {TelegramBot.Message} message 
   */
  indexOfSystem (bot, message) {
    const chatId = message.chat.id
    const messageText = message.text
    const requestsCount = parseInt(messageText);

    const system = SystemService.getSystem(messageText - 1)

    if (isNaN(requestsCount) || !system) {
      bot.sendMessage(chatId, 'Некорректный номер системы. Чтобы начать заново введите /start');
      return;
    }

    this.sessionService.updateSession(chatId, {
      stage: this.sessionService.STAGES.REQUEST_COUNT,
      system: system
    })

    bot.sendMessage(chatId, `Введите количество одновременных запросов`);
  }

  /**
   * @param {TelegramBot} bot
   * @param {TelegramBot.Message} message 
   */
  requestCount (bot, message) {
    const chatId = message.chat.id
    const messageText = message.text
    const requestsCount = parseInt(messageText);

    if (isNaN(requestsCount)) {
      bot.sendMessage(chatId, 'Введите целое число запросов, или чтобы начать заново, введите /start');
      return;
    }

    const session = this.sessionService.getSession(chatId);

    if (!session) {
      bot.sendMessage(chatId, 'Ошибка. Чтобы начать заново введите /start');
      return;
    }

    const time = session.system.func(requestsCount).toFixed(0);

    bot.sendMessage(chatId, `Среднее время отклика в системе ${time} мс. Введите другое значение, или, чтобы начать заново, введите /start`);
  }
}