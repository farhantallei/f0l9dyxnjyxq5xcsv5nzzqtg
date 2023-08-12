"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListMessagesSchema = exports.ListInboxesSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListInboxesSchema = {
    summary: 'Daftar Inbox',
    description: 'Menampilkan daftar inbox.',
    tags: ['Client / E-Commerce'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            outlet: type_provider_typebox_1.Type.String(),
            profileUrl: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                type_provider_typebox_1.Type.Null(),
            ]),
            unreadCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
            type: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.Literal('text'),
                type_provider_typebox_1.Type.Literal('image'),
                type_provider_typebox_1.Type.Literal('bid'),
                type_provider_typebox_1.Type.Literal('product'),
            ]),
            lastMessage: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.String(), type_provider_typebox_1.Type.Null()]),
            lastMessageTime: type_provider_typebox_1.Type.Number(),
        })),
    },
};
exports.ListMessagesSchema = {
    summary: 'Daftar Pesan Inbox',
    description: 'Untuk menampilkan isi chat dari inbox.',
    tags: ['Client / E-Commerce'],
    params: type_provider_typebox_1.Type.Object({
        id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            outlet: type_provider_typebox_1.Type.String(),
            profileUrl: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.String(), type_provider_typebox_1.Type.Null()]),
            messages: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                senderId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                admin: type_provider_typebox_1.Type.Boolean(),
                type: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.Literal('text'),
                    type_provider_typebox_1.Type.Literal('image'),
                    type_provider_typebox_1.Type.Literal('bid'),
                    type_provider_typebox_1.Type.Literal('product'),
                ]),
                content: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.Object({ text: type_provider_typebox_1.Type.String() }),
                    type_provider_typebox_1.Type.Object({ url: type_provider_typebox_1.Type.String({ format: 'uri-reference' }) }),
                    type_provider_typebox_1.Type.Object({
                        id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                        product: type_provider_typebox_1.Type.String(),
                        price: type_provider_typebox_1.Type.Number(),
                        accepted: type_provider_typebox_1.Type.Boolean(),
                    }),
                    type_provider_typebox_1.Type.Object({
                        id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                        product: type_provider_typebox_1.Type.String(),
                        price: type_provider_typebox_1.Type.Number(),
                        text: type_provider_typebox_1.Type.String(),
                    }),
                    type_provider_typebox_1.Type.Null(),
                ]),
                readAt: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Number(), type_provider_typebox_1.Type.Null()]),
                createdAt: type_provider_typebox_1.Type.Number(),
            })),
        }),
    },
};
