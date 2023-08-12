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
exports.RejectAppointmentHandler = exports.AcceptAppointmentHandler = exports.GetAppointmentReviewHandler = exports.EndCallHandler = exports.CreateCallHandler = exports.ListAppointmentsHandler = exports.ListRequestedAppointmentsHandler = void 0;
const appointment_services_1 = require("./appointment.services");
const ListRequestedAppointmentsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const agronomId = request.agronomId;
    const appointments = yield (0, appointment_services_1.getAllRequestedAppointments)(reply, agronomId);
    return reply.send(appointments);
});
exports.ListRequestedAppointmentsHandler = ListRequestedAppointmentsHandler;
const ListAppointmentsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = request.query;
    const agronomId = request.agronomId;
    const appointments = yield (0, appointment_services_1.getAllAppointments)(reply, agronomId, status);
    return reply.send(appointments);
});
exports.ListAppointmentsHandler = ListAppointmentsHandler;
const CreateCallHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { appointmentId } = request.params;
    const agronomId = request.agronomId;
    const appointment = yield (0, appointment_services_1.getAppointmentById)(reply, appointmentId, agronomId);
    if (!appointment)
        return reply.badRequest('Appointment does not exists');
    if (appointment.status === 'requested')
        return reply.badRequest('Appointment is not accepted');
    if (appointment.status !== 'accepted')
        return reply.badRequest(`Appointment is already ${appointment.status}`);
    yield (0, appointment_services_1.createAppointmentSessionLog)(reply, appointmentId, 'enter');
    return reply.code(204).send(undefined);
});
exports.CreateCallHandler = CreateCallHandler;
const EndCallHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { appointmentId } = request.params;
    const agronomId = request.agronomId;
    const appointment = yield (0, appointment_services_1.getAppointmentById)(reply, appointmentId, agronomId);
    if (!appointment)
        return reply.badRequest('Appointment does not exists');
    yield (0, appointment_services_1.createAppointmentSessionLog)(reply, appointmentId, 'leave');
    return reply.code(204).send(undefined);
});
exports.EndCallHandler = EndCallHandler;
const GetAppointmentReviewHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { appointmentId } = request.params;
    const agronomId = request.agronomId;
    const appointment = yield (0, appointment_services_1.getAppointmentById)(reply, appointmentId, agronomId);
    if (!appointment)
        return reply.badRequest('Appointment does not exists');
    return reply.send(appointment);
});
exports.GetAppointmentReviewHandler = GetAppointmentReviewHandler;
const AcceptAppointmentHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { appointmentId } = request.params;
    const agronomId = request.agronomId;
    const appointment = yield (0, appointment_services_1.getAppointmentById)(reply, appointmentId, agronomId);
    if (!appointment)
        return reply.badRequest('Appointment does not exists');
    if (appointment.status !== 'requested')
        return reply.badRequest(`Appointment is already ${appointment.status}`);
    yield (0, appointment_services_1.acceptAppointment)(reply, appointmentId);
    return reply.code(204).send(undefined);
});
exports.AcceptAppointmentHandler = AcceptAppointmentHandler;
const RejectAppointmentHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { appointmentId } = request.params;
    const agronomId = request.agronomId;
    const appointment = yield (0, appointment_services_1.getAppointmentById)(reply, appointmentId, agronomId);
    if (!appointment)
        return reply.badRequest('Appointment does not exists');
    if (appointment.status !== 'requested')
        return reply.badRequest(`Appointment is already ${appointment.status}`);
    yield (0, appointment_services_1.rejectAppointment)(reply, appointmentId);
    return reply.code(204).send(undefined);
});
exports.RejectAppointmentHandler = RejectAppointmentHandler;
