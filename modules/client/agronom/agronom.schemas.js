"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateAgronomSchema = exports.CreateAgronomAppointmentSchema = exports.GetAgronomDetailsSchema = exports.ListAgronomsSchema = exports.GetHomeSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.GetHomeSchema = {
    summary: 'Home',
    description: 'Untuk menampilkan data yang dibutuhkan dalam halaman utama.',
    tags: ['Client / Agronom'],
    response: {
        200: type_provider_typebox_1.Type.Object({
            banners: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                url: type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
            })),
            agronoms: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
                specialist: type_provider_typebox_1.Type.String(),
                experience: type_provider_typebox_1.Type.Number(),
                profileUrl: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                    type_provider_typebox_1.Type.Null(),
                ]),
            })),
            products: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
                price: type_provider_typebox_1.Type.Number(),
                rating: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Number(), type_provider_typebox_1.Type.Null()]),
                thumbnailUrl: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                    type_provider_typebox_1.Type.Null(),
                ]),
            })),
        }),
    },
};
exports.ListAgronomsSchema = {
    summary: 'Daftar Agronom',
    description: 'Untuk untuk melihat Agronom.',
    tags: ['Client / Agronom'],
    querystring: type_provider_typebox_1.Type.Object({
        searchQuery: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.String()),
    }),
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
            specialist: type_provider_typebox_1.Type.String(),
            experience: type_provider_typebox_1.Type.Number(),
            profileUrl: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                type_provider_typebox_1.Type.Null(),
            ]),
        })),
    },
};
exports.GetAgronomDetailsSchema = {
    summary: 'Detail Agronom',
    description: 'Mengambil data dari agronom yang diambil dari id.',
    tags: ['Client / Agronom'],
    params: type_provider_typebox_1.Type.Object({
        agronomId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
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
            meta: type_provider_typebox_1.Type.Object({
                agronoms: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                    id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                    name: type_provider_typebox_1.Type.String(),
                    specialist: type_provider_typebox_1.Type.String(),
                    experience: type_provider_typebox_1.Type.Number(),
                    profileUrl: type_provider_typebox_1.Type.Union([
                        type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                        type_provider_typebox_1.Type.Null(),
                    ]),
                })),
            }),
        }),
    },
};
exports.CreateAgronomAppointmentSchema = {
    summary: 'Buat Janji Agronom',
    description: 'Untuk membuat janji dengan agronom.',
    tags: ['Client / Agronom'],
    params: type_provider_typebox_1.Type.Object({
        agronomId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    body: type_provider_typebox_1.Type.Object({
        time: type_provider_typebox_1.Type.String({ format: 'date-time' }),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.RateAgronomSchema = {
    summary: 'Menilai Agronom',
    description: 'Untuk menilai agronom.',
    tags: ['Client / Agronom'],
    params: type_provider_typebox_1.Type.Object({
        agronomId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    body: type_provider_typebox_1.Type.Object({
        like: type_provider_typebox_1.Type.Boolean(),
    }),
    response: { 204: type_provider_typebox_1.Type.Undefined() },
};
