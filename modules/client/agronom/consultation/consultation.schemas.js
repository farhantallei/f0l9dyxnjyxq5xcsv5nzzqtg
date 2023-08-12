"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendConsultationMessageSchema = exports.GetConsultationRoomSchema = exports.ListConsultationMessagesSchema = exports.ListConsultationsSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListConsultationsSchema = {
    summary: 'Daftar Konsultasi',
    description: 'Untuk untuk menampilkan daftar konsultasi.',
    tags: ['Client / Agronom'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.String(),
            name: type_provider_typebox_1.Type.String(),
            profileUrl: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                type_provider_typebox_1.Type.Null(),
            ]),
            unreadCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
            type: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Literal('text'), type_provider_typebox_1.Type.Literal('image')]),
            lastMessage: type_provider_typebox_1.Type.String(),
            lastMessageTime: type_provider_typebox_1.Type.Number(),
        })),
    },
};
exports.ListConsultationMessagesSchema = {
    summary: 'Daftar Pesan Konsultasi',
    description: 'Untuk menampilkan isi chat dari konsultasi.',
    tags: ['Client / Agronom'],
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
exports.GetConsultationRoomSchema = {
    summary: 'Masuk Room Konsultasi',
    description: 'Untuk memasuki room chat konsultasi.',
    tags: ['Client / Agronom'],
    params: type_provider_typebox_1.Type.Object({
        agronomId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            consultationId: type_provider_typebox_1.Type.String(),
        }),
    },
};
exports.SendConsultationMessageSchema = {
    summary: 'Kirim Pesan Konsultasi',
    description: 'Untuk mengirim pesan konsultasi.',
    tags: ['Client / Agronom'],
    params: type_provider_typebox_1.Type.Object({
        consultationId: type_provider_typebox_1.Type.String(),
    }),
    body: type_provider_typebox_1.Type.Object({
        agronomId: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.Integer({
            minimum: 1,
        })),
        message: type_provider_typebox_1.Type.String(),
    }, {
        description: 'Masukkan Agronom Id saat mengirim pesan pertama kali',
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
