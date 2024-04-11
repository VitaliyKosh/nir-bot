import { SlashController } from '../controllers/slash.controller.js';
import { TextController } from '../controllers/text.controller.js';
import { SessionService } from '../services/session.service.js';
import { Router } from '../bot/routers/router.js';

export const $router = new Router();

const sessionService = new SessionService();
const slashController = new SlashController(sessionService);
const textController = new TextController(sessionService);

$router.slash('/start', slashController.start.bind(slashController));
$router.slash('/calculate', slashController.calculate.bind(slashController));
// $router.notMatch(slashController.notMatch.bind(slashController));

$router.text(textController.text.bind(textController));