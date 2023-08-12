"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListClientSchema = exports.CreateClientSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.CreateClientSchema = {
    summary: 'Buat Client',
    description: 'Untuk membuat client.',
    tags: ['Admin / E-Commerce / User Management / Client'],
    body: type_provider_typebox_1.Type.Object({
        name: type_provider_typebox_1.Type.String(),
        email: type_provider_typebox_1.Type.String({ format: 'email' }),
        mobile: type_provider_typebox_1.Type.String(),
    }),
    response: { 204: type_provider_typebox_1.Type.Undefined() },
};
exports.ListClientSchema = {
    summary: 'Daftar Client',
    description: 'Untuk menampilkan daftar administrator.',
    tags: ['Admin / E-Commerce / User Management / Client'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
            email: type_provider_typebox_1.Type.String({ format: 'email' }),
            mobile: type_provider_typebox_1.Type.String(),
            passwordHash: type_provider_typebox_1.Type.String(),
            profileUrl: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.String(), type_provider_typebox_1.Type.Null()]),
            status: type_provider_typebox_1.Type.String(),
            createdAt: type_provider_typebox_1.Type.Number(),
            updatedAt: type_provider_typebox_1.Type.Number(),
        })),
    },
};
