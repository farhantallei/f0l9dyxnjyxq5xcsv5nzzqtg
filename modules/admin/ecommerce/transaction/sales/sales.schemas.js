"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCompleteSchema = exports.ListCancelledSchema = exports.ListShippedSchema = exports.ListIncomingOrdersSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListIncomingOrdersSchema = {
    summary: 'Daftar Pesanan Masuk',
    description: 'Untuk menampilkan daftar pesanan masuk.',
    tags: ['Admin / E-Commerce / Transaction / Sales'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            invoice: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.String(), type_provider_typebox_1.Type.Null()]),
            customer: type_provider_typebox_1.Type.String(),
            productTotal: type_provider_typebox_1.Type.Integer(),
            priceTotal: type_provider_typebox_1.Type.Number(),
            paymentMethod: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Literal('cash')]),
            createdAt: type_provider_typebox_1.Type.Number(),
        })),
    },
};
exports.ListShippedSchema = {
    summary: 'Daftar Dikirim',
    description: 'Untuk menampilkan daftar dikirim.',
    tags: ['Admin / E-Commerce / Transaction / Sales'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            invoice: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.String(), type_provider_typebox_1.Type.Null()]),
            customer: type_provider_typebox_1.Type.String(),
            productTotal: type_provider_typebox_1.Type.Integer(),
            priceTotal: type_provider_typebox_1.Type.Number(),
            paymentMethod: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Literal('cash')]),
            createdAt: type_provider_typebox_1.Type.Number(),
        })),
    },
};
exports.ListCancelledSchema = {
    summary: 'Daftar Dibatalkan',
    description: 'Untuk menampilkan daftar dibatalkan.',
    tags: ['Admin / E-Commerce / Transaction / Sales'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            invoice: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.String(), type_provider_typebox_1.Type.Null()]),
            customer: type_provider_typebox_1.Type.String(),
            productTotal: type_provider_typebox_1.Type.Integer(),
            priceTotal: type_provider_typebox_1.Type.Number(),
            paymentMethod: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Literal('cash')]),
            createdAt: type_provider_typebox_1.Type.Number(),
        })),
    },
};
exports.ListCompleteSchema = {
    summary: 'Daftar Selesai',
    description: 'Untuk menampilkan daftar selesai.',
    tags: ['Admin / E-Commerce / Transaction / Sales'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            invoice: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.String(), type_provider_typebox_1.Type.Null()]),
            customer: type_provider_typebox_1.Type.String(),
            productTotal: type_provider_typebox_1.Type.Integer(),
            priceTotal: type_provider_typebox_1.Type.Number(),
            paymentMethod: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Literal('cash')]),
            createdAt: type_provider_typebox_1.Type.Number(),
        })),
    },
};
