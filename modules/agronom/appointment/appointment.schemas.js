"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RejectAppointmentSchema = exports.AcceptAppointmentSchema = exports.GetAppointmentReviewSchema = exports.EndCallSchema = exports.CreateCallSchema = exports.ListAppointmentsSchema = exports.ListRequestedAppointmentsSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListRequestedAppointmentsSchema = {
    summary: 'Daftar Persetujuan Janji',
    description: 'Untuk menampilkan daftar persetujuan janji.',
    tags: ['Agronom / Appointment'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            time: type_provider_typebox_1.Type.Number(),
            name: type_provider_typebox_1.Type.String(),
            profileUrl: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                type_provider_typebox_1.Type.Null(),
            ]),
        })),
    },
};
exports.ListAppointmentsSchema = {
    summary: 'Daftar Janji Temu',
    description: 'Untuk menampilkan daftar janji temu.',
    tags: ['Agronom / Appointment'],
    querystring: type_provider_typebox_1.Type.Object({
        status: type_provider_typebox_1.Type.Union([
            type_provider_typebox_1.Type.Literal('accepted'),
            type_provider_typebox_1.Type.Literal('available'),
            type_provider_typebox_1.Type.Literal('completed'),
            type_provider_typebox_1.Type.Literal('expired'),
            type_provider_typebox_1.Type.Literal('rejected'),
        ], {
            description: '[accepted, available, completed, expired, rejected]',
        }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            time: type_provider_typebox_1.Type.Number(),
            name: type_provider_typebox_1.Type.String(),
            regency: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.String(), type_provider_typebox_1.Type.Null()]),
            profileUrl: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                type_provider_typebox_1.Type.Null(),
            ]),
        })),
    },
};
exports.CreateCallSchema = {
    summary: 'Membuat Panggilan',
    description: 'Untuk membuat panggilan dari agronom.',
    tags: ['Agronom / Appointment'],
    params: type_provider_typebox_1.Type.Object({
        appointmentId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.EndCallSchema = {
    summary: 'Mengakhiri Panggilan',
    description: 'Untuk mengakhiri panggilan dari agronom.',
    tags: ['Agronom / Appointment'],
    params: type_provider_typebox_1.Type.Object({
        appointmentId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.GetAppointmentReviewSchema = {
    summary: 'Review Pertemuan',
    description: 'Untuk menampilkan data review pertemuan.',
    tags: ['Agronom / Appointment'],
    params: type_provider_typebox_1.Type.Object({
        appointmentId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            time: type_provider_typebox_1.Type.Number(),
            name: type_provider_typebox_1.Type.String(),
            regency: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.String(), type_provider_typebox_1.Type.Null()]),
            profileUrl: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                type_provider_typebox_1.Type.Null(),
            ]),
        }),
    },
};
exports.AcceptAppointmentSchema = {
    summary: 'Menyetujui Janji',
    description: 'Untuk menyetujui janji pertemuan.',
    tags: ['Agronom / Appointment'],
    params: type_provider_typebox_1.Type.Object({
        appointmentId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.RejectAppointmentSchema = {
    summary: 'Menolak Janji',
    description: 'Untuk menolak janji temu.',
    tags: ['Agronom / Appointment'],
    params: type_provider_typebox_1.Type.Object({
        appointmentId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
