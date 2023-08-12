"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAgronomSchema = exports.ListAgronomsSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListAgronomsSchema = {
    summary: 'Daftar Agronom',
    description: 'Untuk menampilkan daftar agronom.',
    tags: ['Admin / Agronom'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
            name: type_provider_typebox_1.Type.String(),
            specialist: type_provider_typebox_1.Type.String(),
            university: type_provider_typebox_1.Type.String(),
            experience: type_provider_typebox_1.Type.Number({ minimum: 0 }),
            profileUrl: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                type_provider_typebox_1.Type.Null(),
            ]),
        })),
    },
};
exports.CreateAgronomSchema = {
    summary: 'Membuat Agronom',
    description: 'Untuk membuat agronom.',
    tags: ['Admin / Agronom'],
    body: type_provider_typebox_1.Type.Object({
        name: type_provider_typebox_1.Type.String(),
        email: type_provider_typebox_1.Type.String({ format: 'email' }),
        mobile: type_provider_typebox_1.Type.String(),
        university: type_provider_typebox_1.Type.String(),
        experience: type_provider_typebox_1.Type.Number(),
        description: type_provider_typebox_1.Type.String(),
        specialistId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
