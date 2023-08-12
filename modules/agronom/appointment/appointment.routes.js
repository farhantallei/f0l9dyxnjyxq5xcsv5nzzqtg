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
exports.appointmentRoutes = void 0;
const appointment_schemas_1 = require("./appointment.schemas");
const appointment_handlers_1 = require("./appointment.handlers");
const agronom_1 = require("../../../middleware/agronom");
const appointmentRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.addHook('preHandler', agronom_1.AuthenticationHandler);
    route.get('/', {
        schema: appointment_schemas_1.ListAppointmentsSchema,
        handler: appointment_handlers_1.ListAppointmentsHandler,
    });
    route.get('/requested', {
        schema: appointment_schemas_1.ListRequestedAppointmentsSchema,
        handler: appointment_handlers_1.ListRequestedAppointmentsHandler,
    });
    route.get('/:appointmentId', {
        schema: appointment_schemas_1.GetAppointmentReviewSchema,
        handler: appointment_handlers_1.GetAppointmentReviewHandler,
    });
    route.post('/:appointmentId/accept', {
        schema: appointment_schemas_1.AcceptAppointmentSchema,
        handler: appointment_handlers_1.AcceptAppointmentHandler,
    });
    route.post('/:appointmentId/reject', {
        schema: appointment_schemas_1.RejectAppointmentSchema,
        handler: appointment_handlers_1.RejectAppointmentHandler,
    });
    route.post('/:appointmentId/call', {
        schema: appointment_schemas_1.CreateCallSchema,
        handler: appointment_handlers_1.CreateCallHandler,
    });
    route.post('/:appointmentId/hangup', {
        schema: appointment_schemas_1.EndCallSchema,
        handler: appointment_handlers_1.EndCallHandler,
    });
});
exports.appointmentRoutes = appointmentRoutes;
