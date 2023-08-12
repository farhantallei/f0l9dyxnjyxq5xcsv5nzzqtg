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
exports.ListMessagesHandler = exports.ListInboxesHandler = void 0;
const chat_services_1 = require("./chat.services");
const ListInboxesHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.userId;
    const inboxes = yield (0, chat_services_1.getAllInboxes)(reply, userId);
    return reply.send(inboxes);
});
exports.ListInboxesHandler = ListInboxesHandler;
const ListMessagesHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const userId = request.userId;
    const inbox = yield (0, chat_services_1.getInboxById)(reply, id);
    if (!inbox)
        return reply.badRequest('Inbox does not exists');
    if (inbox.userId !== userId)
        return reply.forbidden('You do not have permission to access this inbox');
    const userMessages = yield (0, chat_services_1.getAllUserMessages)(reply, id);
    const adminMessages = yield (0, chat_services_1.getAllAdminMessages)(reply, id);
    const messages = userMessages.concat(adminMessages);
    messages.sort((a, b) => b.createdAt - a.createdAt);
    return reply.send({
        outlet: inbox.outlet.name,
        profileUrl: inbox.outlet.profileUrl,
        messages,
    });
});
exports.ListMessagesHandler = ListMessagesHandler;
