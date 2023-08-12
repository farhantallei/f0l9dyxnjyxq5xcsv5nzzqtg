"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOtherNotificationsSchema = exports.ListSalesNotificationsSchema = exports.ListPurchaseNotificationsSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListPurchaseNotificationsSchema = {
    summary: 'Daftar Notifikasi Pembelian',
    description: 'Menampilkan daftar notifikasi pembelian.',
    tags: ['Client / E-Commerce'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            orderId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            type: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.Literal('purchase'),
                type_provider_typebox_1.Type.Literal('delivery'),
                type_provider_typebox_1.Type.Literal('arrived'),
            ]),
            readAt: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Number(), type_provider_typebox_1.Type.Null()]),
            createdAt: type_provider_typebox_1.Type.Number(),
        }), {
            description: 'type: [purchase, delivery, arrived]',
        }),
    },
};
exports.ListSalesNotificationsSchema = {
    summary: 'Daftar Notifikasi Penjualan',
    description: 'Menampilkan daftar notifikasi penjualan.',
    tags: ['Client / E-Commerce'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            productId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            type: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.Literal('approved'),
                type_provider_typebox_1.Type.Literal('pickup'),
                type_provider_typebox_1.Type.Literal('rejected'),
                type_provider_typebox_1.Type.Literal('received'),
            ]),
            readAt: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Number(), type_provider_typebox_1.Type.Null()]),
            createdAt: type_provider_typebox_1.Type.Number(),
        }), {
            description: 'type: [approved, pickup, rejected, received]',
        }),
    },
};
exports.ListOtherNotificationsSchema = {
    summary: 'Daftar Notifikasi Lainnya',
    description: 'Menampilkan daftar notifikasi lainnya.',
    tags: ['Client / E-Commerce'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            readAt: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Number(), type_provider_typebox_1.Type.Null()]),
            createdAt: type_provider_typebox_1.Type.Number(),
        })),
    },
};
