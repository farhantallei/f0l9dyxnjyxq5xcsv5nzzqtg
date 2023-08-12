"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHomeSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.GetHomeSchema = {
    summary: 'Home',
    description: 'Untuk menampilkan data yang dibutuhkan dalam halaman utama.',
    tags: ['Agronom / Home'],
    response: {
        200: type_provider_typebox_1.Type.Object({
            banners: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                url: type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
            })),
            requestedAppointments: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                time: type_provider_typebox_1.Type.Number(),
                name: type_provider_typebox_1.Type.String(),
                profileUrl: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                    type_provider_typebox_1.Type.Null(),
                ]),
            })),
            lastAppointments: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                time: type_provider_typebox_1.Type.Number(),
                name: type_provider_typebox_1.Type.String(),
                profileUrl: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                    type_provider_typebox_1.Type.Null(),
                ]),
            })),
        }),
    },
};
