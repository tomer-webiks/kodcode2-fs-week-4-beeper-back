"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const beeperController_1 = require("../controllers/beeperController");
exports.router = express_1.default.Router();
exports.router.post('/beepers', beeperController_1.createBeeper);
exports.router.get('/beepers', beeperController_1.getAllBeepers);
exports.router.get('/beepers/:id', beeperController_1.getBeeperById);
exports.router.put('/beepers/:id', beeperController_1.updateBeeper);
exports.router.put('/beepers/:id/status', beeperController_1.updateBeeper);
exports.router.delete('/beepers/:id', beeperController_1.deleteBeeper);
exports.router.post('/beepers/:id/activate', beeperController_1.activateBeeper);
