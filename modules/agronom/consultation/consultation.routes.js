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
const consultation_schemas_1 = require("./consultation.schemas");
const consultation_handlers_1 = require("./consultation.handlers");
const agronom_1 = require("../../../middleware/agronom");
const consultationRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.addHook('preHandler', agronom_1.AuthenticationHandler);
    route.get('/', {
        schema: consultation_schemas_1.ListUserConsultationsSchema,
        handler: consultation_handlers_1.ListUserConsultationsHandler,
    });
    route.get('/:consultationId', {
        schema: consultation_schemas_1.ListMessagesSchema,
        handler: consultation_handlers_1.ListMessagesHandler,
    });
    route.post('/:consultationId/message', {
        schema: consultation_schemas_1.SendMessageSchema,
        handler: consultation_handlers_1.SendMessageHandler,
    });
});
exports.consultationRoutes = consultationRoutes;
