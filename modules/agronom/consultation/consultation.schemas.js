"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendImageSchema = exports.SendMessageSchema = exports.ListMessagesSchema = exports.ListUserConsultationsSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListUserConsultationsSchema = {
    summary: 'Daftar Konsultasi',
    description: 'Menampilkan daftar konsultasi.',
    tags: ['Agronom / Consultation'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.String(),
            name: type_provider_typebox_1.Type.String(),
            profileUrl: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                type_provider_typebox_1.Type.Null(),
            ]),
            unreadCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
            agronom: type_provider_typebox_1.Type.Boolean(),
            type: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Literal('text'), type_provider_typebox_1.Type.Literal('image')]),
            lastMessage: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.String(), type_provider_typebox_1.Type.Null()]),
            lastMessageTime: type_provider_typebox_1.Type.Number(),
        })),
    },
};
exports.ListMessagesSchema = {
    summary: 'Daftar Pesan Konsultasi',
    description: 'Untuk menampilkan isi chat dari konsultasi.',
    tags: ['Agronom / Consultation'],
    params: type_provider_typebox_1.Type.Object({
        consultationId: type_provider_typebox_1.Type.String(),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            name: type_provider_typebox_1.Type.String(),
            profileUrl: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.String(), type_provider_typebox_1.Type.Null()]),
            messages: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                senderId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                agronom: type_provider_typebox_1.Type.Boolean(),
                type: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Literal('text'), type_provider_typebox_1.Type.Literal('image')]),
                content: type_provider_typebox_1.Type.String(),
                readAt: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Number(), type_provider_typebox_1.Type.Null()]),
                createdAt: type_provider_typebox_1.Type.Number(),
            })),
        }),
    },
};
exports.SendMessageSchema = {
    summary: 'Kirim Pesan',
    description: 'Untuk mengirim pesan ke agronom.',
    tags: ['Agronom / Consultation'],
    params: type_provider_typebox_1.Type.Object({
        consultationId: type_provider_typebox_1.Type.String(),
    }),
    body: type_provider_typebox_1.Type.Object({ message: type_provider_typebox_1.Type.String() }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.SendImageSchema = {
    summary: 'Kirim Gambar',
    description: 'Untuk mengirim gambar ke agronom.',
    tags: ['Agronom / Consultation'],
    params: type_provider_typebox_1.Type.Object({
        consultationId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    body: type_provider_typebox_1.Type.Object({ message: type_provider_typebox_1.Type.String() }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
