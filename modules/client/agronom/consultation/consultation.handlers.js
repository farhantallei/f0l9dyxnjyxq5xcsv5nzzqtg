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
exports.SendConsultationMessageHandler = exports.GetConsultationRoomHandler = exports.ListConsultationMessagesHandler = exports.ListConsultationsHandler = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
const app_1 = require("../../../../app");
const consultation_services_1 = require("./consultation.services");
const cuid_1 = require("../../../../lib/cuid");
const ListConsultationsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.userId;
    const consultations = yield (0, consultation_services_1.getAllConsultations)(reply, userId);
    return reply.send(consultations);
});
exports.ListConsultationsHandler = ListConsultationsHandler;
const ListConsultationMessagesHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { consultationId } = request.params;
    const userId = request.userId;
    const consultation = yield (0, consultation_services_1.getConsultationById)(reply, consultationId, userId);
    if (!consultation)
        return reply.badRequest('Consultation does not exists');
    const messages = yield (0, consultation_services_1.getAllConsultationMessages)(reply, consultationId);
    return reply.send({
        name: consultation.agronom.name,
        profileUrl: consultation.agronom.profileUrl,
        messages,
    });
});
exports.ListConsultationMessagesHandler = ListConsultationMessagesHandler;
const GetConsultationRoomHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { agronomId } = request.params;
    const userId = request.userId;
    const agronom = yield (0, consultation_services_1.getAgronomById)(reply, agronomId);
    if (!agronom)
        return reply.badRequest('Agronom does not exists');
    const consultation = yield (0, consultation_services_1.getConsultationByUserIdAgronomId)(reply, {
        userId,
        agronomId,
    });
    if (!consultation)
        return reply.send({ consultationId: (0, cuid_1.createId)() });
    return reply.send({ consultationId: consultation.id });
});
exports.GetConsultationRoomHandler = GetConsultationRoomHandler;
const SendConsultationMessageHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { consultationId } = request.params;
    const { agronomId, message } = request.body;
    const userId = request.userId;
    if (!(0, cuid2_1.isCuid)(consultationId))
        return reply.badRequest('body/consultationId must match format \\"cuid\\"');
    const consultation = yield (0, consultation_services_1.getConsultationById)(reply, consultationId, userId);
    if (!consultation) {
        if (!agronomId)
            return reply.badRequest("body must have required property 'agronomId'");
        const existingAgronom = yield (0, consultation_services_1.getAgronomById)(reply, agronomId);
        if (!existingAgronom)
            return reply.notFound('Agronom does not exists');
        yield (0, consultation_services_1.createConsultation)(reply, { id: consultationId, userId, agronomId });
    }
    const { id, createdAt } = yield (0, consultation_services_1.createConsultationMessage)(reply, userId, consultationId, message);
    app_1.agronomConsultationIo.to(consultationId.toString()).emit('receiveMessage', {
        id,
        senderId: userId,
        agronom: false,
        type: 'text',
        content: message,
        readAt: null,
        createdAt,
    });
    return reply.code(204).send(undefined);
});
exports.SendConsultationMessageHandler = SendConsultationMessageHandler;
