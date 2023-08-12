"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndAppointmentCallSchema = exports.CreateAppointmentCallSchema = exports.ListAppointmentsSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListAppointmentsSchema = {
    summary: 'Daftar Janji Agronom',
    description: 'Untuk menampilkan daftar janji agronom.',
    tags: ['Client / Agronom'],
    querystring: type_provider_typebox_1.Type.Object({
        status: type_provider_typebox_1.Type.Union([
            type_provider_typebox_1.Type.Literal('requested'),
            type_provider_typebox_1.Type.Literal('accepted'),
            type_provider_typebox_1.Type.Literal('available'),
            type_provider_typebox_1.Type.Literal('expired'),
            type_provider_typebox_1.Type.Literal('completed'),
            type_provider_typebox_1.Type.Literal('rejected'),
        ], {
            description: '[requested, accepted, available, expired, completed, rejected]',
        }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            time: type_provider_typebox_1.Type.Number(),
            name: type_provider_typebox_1.Type.String(),
            specialist: type_provider_typebox_1.Type.String(),
            profileUrl: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                type_provider_typebox_1.Type.Null(),
            ]),
        })),
    },
};
exports.CreateAppointmentCallSchema = {
    summary: 'Membuat Panggilan Janji',
    description: 'Untuk membuat panggilan janji.',
    tags: ['Client / Agronom'],
    params: type_provider_typebox_1.Type.Object({
        appointmentId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.EndAppointmentCallSchema = {
    summary: 'Mengakhiri Panggilan Janji',
    description: 'Untuk mengakhiri panggilan janji.',
    tags: ['Client / Agronom'],
    params: type_provider_typebox_1.Type.Object({
        appointmentId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
