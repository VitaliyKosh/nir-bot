import { Router } from './routers/router.js'
import TelegramBot from 'node-telegram-bot-api';

export class Bot {
  #bot
  /**
   * @type {Router}
   */
  #messageRouter

  /**
   * @param {TelegramBot} bot
   */
  constructor (bot) {
    this.#bot = bot

    bot.on('message', async message => {
      this.#newMessage(message);
    })
  }

  /**
   * @param {Router} router 
   */
  setMessageRouter (router) {
    this.#messageRouter = router
  }

  /**
   * @param {TelegramBot.Message} message 
   */
  #newMessage (message) {
    if (!this.#messageRouter) {
      return;
    }

    if (message.text.startsWith('/')) {
      this.#messageRouter.newSlashMessage(this.#bot, message);
    } else {
      this.#messageRouter.newTextMessage(this.#bot, message)
    }
  }
}
