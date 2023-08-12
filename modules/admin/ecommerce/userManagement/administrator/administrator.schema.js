"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAdministratorSchema = exports.CreateAdministratorSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.CreateAdministratorSchema = {
    summary: 'Buat Administrator',
    description: 'Untuk membuat admin.',
    tags: ['Admin / E-Commerce / User Management / Administrator'],
    body: type_provider_typebox_1.Type.Object({
        name: type_provider_typebox_1.Type.String(),
        username: type_provider_typebox_1.Type.String(),
        email: type_provider_typebox_1.Type.String({ format: 'email' }),
        mobile: type_provider_typebox_1.Type.String(),
        outletId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: { 204: type_provider_typebox_1.Type.Undefined() },
};
exports.ListAdministratorSchema = {
    summary: 'Daftar Administrator',
    description: 'Untuk menampilkan daftar administrator.',
    tags: ['Admin / E-Commerce / User Management / Administrator'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            outletId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
            username: type_provider_typebox_1.Type.String(),
            email: type_provider_typebox_1.Type.String({ format: 'email' }),
            mobile: type_provider_typebox_1.Type.String(),
            passwordHash: type_provider_typebox_1.Type.String(),
            profileUrl: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.String(), type_provider_typebox_1.Type.Null()]),
            createdAt: type_provider_typebox_1.Type.Number(),
            updatedAt: type_provider_typebox_1.Type.Number(),
        })),
    },
};
