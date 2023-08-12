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
exports.SendMessageHandler = exports.ListMessagesHandler = exports.ListUserConsultationsHandler = void 0;
const app_1 = require("../../../app");
const consultation_services_1 = require("./consultation.services");
const ListUserConsultationsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const agronomId = request.agronomId;
    const consultations = yield (0, consultation_services_1.getAllUserConsultations)(reply, agronomId);
    return reply.send(consultations);
});
exports.ListUserConsultationsHandler = ListUserConsultationsHandler;
const ListMessagesHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { consultationId } = request.params;
    const agronomId = request.agronomId;
    const consultation = yield (0, consultation_services_1.getConsultationById)(reply, consultationId);
    if (!consultation)
        return reply.badRequest('Consultation does not exists');
    if (consultation.agronomId !== agronomId)
        return reply.forbidden('You do not have permission to access this consultation');
    const messages = yield (0, consultation_services_1.getAllConsultationMessages)(reply, consultationId);
    return reply.send({
        name: consultation.user.name,
        profileUrl: consultation.user.profileUrl,
        messages,
    });
});
exports.ListMessagesHandler = ListMessagesHandler;
const SendMessageHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { consultationId } = request.params;
    const { message } = request.body;
    const agronomId = request.agronomId;
    const consultation = yield (0, consultation_services_1.getConsultationById)(reply, consultationId);
    if (!consultation)
        return reply.badRequest('Consultation does not exists');
    if (consultation.agronomId !== agronomId)
        return reply.forbidden('You do not have permission to access this consultation');
    const { id, createdAt } = yield (0, consultation_services_1.createAgronomMessage)(reply, agronomId, consultationId, message);
    app_1.agronomConsultationIo.to(consultationId.toString()).emit('receiveMessage', {
        id,
        senderId: agronomId,
        agronom: true,
        type: 'text',
        content: message,
        readAt: null,
        createdAt,
    });
    return reply.code(204).send(undefined);
});
exports.SendMessageHandler = SendMessageHandler;
