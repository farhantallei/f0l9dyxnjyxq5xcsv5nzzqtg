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
exports.consultationRoutes = void 0;
const consultation_handlers_1 = require("./consultation.handlers");
const consultation_schemas_1 = require("./consultation.schemas");
const consultationRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/', {
        schema: consultation_schemas_1.ListConsultationsSchema,
        handler: consultation_handlers_1.ListConsultationsHandler,
    });
    route.get('/room/:agronomId', {
        schema: consultation_schemas_1.GetConsultationRoomSchema,
        handler: consultation_handlers_1.GetConsultationRoomHandler,
    });
    route.get('/:consultationId', {
        schema: consultation_schemas_1.ListConsultationMessagesSchema,
        handler: consultation_handlers_1.ListConsultationMessagesHandler,
    });
    route.post('/:consultationId', {
        schema: consultation_schemas_1.SendConsultationMessageSchema,
        handler: consultation_handlers_1.SendConsultationMessageHandler,
    });
});
exports.consultationRoutes = consultationRoutes;
