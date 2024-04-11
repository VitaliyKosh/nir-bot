import TelegramBot from 'node-telegram-bot-api';
import { getSlashInfo } from "../lib/get-slash-info.js";

export class Router {
  #slashListeners = new Map();
  #messageListeners = [];
  #notMatchListeners = [];

  /**
   * @param {string} command
   * @param {function(TelegramBot, TelegramBot.Message): void} listener 
   */
  slash (command, listener) {
    this.#slashListeners.set(command, listener);
  }

  /**
   * @param {function(TelegramBot, TelegramBot.Message): void} listener 
   */
  text (listener) {
    this.#messageListeners.push(listener);
  }

  /**
   * @param {function(TelegramBot, TelegramBot.Message): void} listener 
   */
  notMatch (listener) {
    this.#notMatchListeners.push(listener);
  }

  /**
   * @param {TelegramBot} bot
   * @param {TelegramBot.Message} message 
   */
  newSlashMessage(bot, message) {
    const { slash: route } = getSlashInfo(message.text);
    const listener = this.#slashListeners.get(route);

    if (listener) {
      listener(bot, message);
    } else {
      this.#notMatchListeners.forEach(listener => {
        listener(bot, message);
      });
    }
  }

  /**
   * @param {TelegramBot} bot
   * @param {TelegramBot.Message} message 
   */
  newTextMessage(bot, message) {
    this.#messageListeners.forEach(listener => {
      listener?.(bot, message);
    });
  }
}
