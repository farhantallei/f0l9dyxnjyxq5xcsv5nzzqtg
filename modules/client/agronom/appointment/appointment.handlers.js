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
exports.EndAppointmentCallHandler = exports.CreateAppointmentCallHandler = exports.ListAppointmentsHandler = void 0;
const appointment_services_1 = require("./appointment.services");
const ListAppointmentsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = request.query;
    const userId = request.userId;
    const appointments = yield (0, appointment_services_1.getAllAppointments)(reply, userId, status);
    return reply.send(appointments);
});
exports.ListAppointmentsHandler = ListAppointmentsHandler;
const CreateAppointmentCallHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { appointmentId } = request.params;
    const userId = request.userId;
    const appointment = yield (0, appointment_services_1.getAppointmentById)(reply, appointmentId, userId);
    if (!appointment)
        return reply.badRequest('Appointment does not exists');
    if (appointment.status === 'requested')
        return reply.badRequest('Appointment is not accepted');
    if (appointment.status !== 'accepted')
        return reply.badRequest(`Appointment is already ${appointment.status}`);
    yield (0, appointment_services_1.createAppointmentSessionLog)(reply, appointmentId, 'enter');
    return reply.code(204).send(undefined);
});
exports.CreateAppointmentCallHandler = CreateAppointmentCallHandler;
const EndAppointmentCallHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { appointmentId } = request.params;
    const userId = request.userId;
    const appointment = yield (0, appointment_services_1.getAppointmentById)(reply, appointmentId, userId);
    if (!appointment)
        return reply.badRequest('Appointment does not exists');
    yield (0, appointment_services_1.createAppointmentSessionLog)(reply, appointmentId, 'leave');
    return reply.code(204).send(undefined);
});
exports.EndAppointmentCallHandler = EndAppointmentCallHandler;
