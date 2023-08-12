"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAgronomSpecialistsSchema = exports.CreateAgronomSpecialistSchema = exports.CreateAgronomSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.CreateAgronomSchema = {
    summary: 'Buat Agronom',
    description: 'Untuk membuat agronom.',
    tags: ['Admin.UserManagement.Agronom'],
    body: type_provider_typebox_1.Type.Object({
        name: type_provider_typebox_1.Type.String(),
        email: type_provider_typebox_1.Type.String({ format: 'email' }),
        mobile: type_provider_typebox_1.Type.String(),
        university: type_provider_typebox_1.Type.String(),
        experience: type_provider_typebox_1.Type.Number({ minimum: 0 }),
        specialistId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: { 204: type_provider_typebox_1.Type.Undefined() },
};
exports.CreateAgronomSpecialistSchema = {
    summary: 'Buat Spesialis Agronom',
    description: 'Untuk membuat spesialis agronom.',
    tags: ['Admin.UserManagement.Agronom'],
    body: type_provider_typebox_1.Type.Object({ specialist: type_provider_typebox_1.Type.String() }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            specialist: type_provider_typebox_1.Type.String(),
        }),
    },
};
exports.ListAgronomSpecialistsSchema = {
    summary: 'Daftar Spesialis Agronom',
    description: 'Untuk menampilkan daftar spesialis agronom.',
    tags: ['Admin.UserManagement.Agronom'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            specialist: type_provider_typebox_1.Type.String(),
        })),
    },
};
