"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRoutes = void 0;
const chat_handlers_1 = require("./chat.handlers");
const chat_schemas_1 = require("./chat.schemas");
const chatRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/inbox', {
        schema: chat_schemas_1.ListInboxesSchema,
        handler: chat_handlers_1.ListInboxesHandler,
    });
    route.get('/inbox/:id', {
        schema: chat_schemas_1.ListMessagesSchema,
        handler: chat_handlers_1.ListMessagesHandler,
    });
});
exports.chatRoutes = chatRoutes;
