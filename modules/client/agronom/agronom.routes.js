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
exports.agronomRoutes = void 0;
const agronom_schemas_1 = require("./agronom.schemas");
const client_1 = require("../../../middleware/client");
const agronom_handlers_1 = require("./agronom.handlers");
const appointment_routes_1 = require("./appointment/appointment.routes");
const consultation_routes_1 = require("./consultation/consultation.routes");
const agronomRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.addHook('preHandler', client_1.AuthenticationHandler);
    route.get('/', {
        schema: agronom_schemas_1.ListAgronomsSchema,
        handler: agronom_handlers_1.ListAgronomsHandler,
    });
    route.get('/home', {
        schema: agronom_schemas_1.GetHomeSchema,
        handler: agronom_handlers_1.GetHomeHandler,
    });
    route.get('/:agronomId', {
        schema: agronom_schemas_1.GetAgronomDetailsSchema,
        handler: agronom_handlers_1.GetAgronomDetailsHandler,
    });
    route.post('/:agronomId/appointment', {
        schema: agronom_schemas_1.CreateAgronomAppointmentSchema,
        handler: agronom_handlers_1.CreateAgronomAppointmentHandler,
    });
    route.post('/:agronomId/like', {
        schema: agronom_schemas_1.RateAgronomSchema,
        handler: agronom_handlers_1.RateAgronomHandler,
    });
    route.register(appointment_routes_1.appointmentRoutes, { prefix: 'appointment' });
    route.register(consultation_routes_1.consultationRoutes, { prefix: 'consultation' });
});
exports.agronomRoutes = agronomRoutes;
