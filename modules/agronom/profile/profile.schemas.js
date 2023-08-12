"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProfileSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.GetProfileSchema = {
    summary: 'Profil',
    description: 'Untuk menampilkan profil agronom.',
    tags: ['Agronom / Profile'],
    response: {
        200: type_provider_typebox_1.Type.Object({
            name: type_provider_typebox_1.Type.String(),
            specialist: type_provider_typebox_1.Type.String(),
            university: type_provider_typebox_1.Type.String(),
            like: type_provider_typebox_1.Type.Number({ minimum: 0, maximum: 1 }),
            experience: type_provider_typebox_1.Type.Number(),
            description: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.String(), type_provider_typebox_1.Type.Null()]),
            profileUrl: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                type_provider_typebox_1.Type.Null(),
            ]),
        }),
    },
};
