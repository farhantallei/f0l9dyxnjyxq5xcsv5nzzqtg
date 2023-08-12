"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInvoiceSchema = exports.GetProductDetailsSchema = exports.ListProductsSchema = exports.UploadProductSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.UploadProductSchema = {
    summary: 'Upload Produk',
    description: 'Untuk mengupload produk yang dijual user.',
    tags: ['Client / Sales'],
    body: type_provider_typebox_1.Type.Object({
        name: type_provider_typebox_1.Type.String(),
        price: type_provider_typebox_1.Type.Number(),
        weight: type_provider_typebox_1.Type.Integer(),
        description: type_provider_typebox_1.Type.String(),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.ListProductsSchema = {
    summary: 'Daftar Produk',
    description: 'Untuk menampilkan daftar produk yang dijual oleh user.',
    tags: ['Client / Sales'],
    response: {
        200: type_provider_typebox_1.Type.Object({
            requested: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
                price: type_provider_typebox_1.Type.Number(),
                thumbnailUrl: type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
            })),
            approved: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
                price: type_provider_typebox_1.Type.Number(),
                thumbnailUrl: type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
            })),
            pickup: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
                price: type_provider_typebox_1.Type.Number(),
                thumbnailUrl: type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
            })),
            complete: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
                price: type_provider_typebox_1.Type.Number(),
                thumbnailUrl: type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
            })),
            rejected: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
                price: type_provider_typebox_1.Type.Number(),
                thumbnailUrl: type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
            })),
        }),
    },
};
exports.GetProductDetailsSchema = {
    summary: 'Detail Produk',
    description: 'Untuk menampilkan detail produk yang dijual oleh user.',
    tags: ['Client / Sales'],
    response: {
        200: type_provider_typebox_1.Type.Object({
            address: type_provider_typebox_1.Type.String(),
            name: type_provider_typebox_1.Type.String(),
            price: type_provider_typebox_1.Type.Number(),
            thumbnailUrl: type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
            invoice: type_provider_typebox_1.Type.String(),
            log: type_provider_typebox_1.Type.Object({
                requested: type_provider_typebox_1.Type.Number(),
                paid: type_provider_typebox_1.Type.Number(),
                pickup: type_provider_typebox_1.Type.Number(),
                complete: type_provider_typebox_1.Type.Number(),
            }),
        }),
    },
};
exports.GetInvoiceSchema = {
    summary: 'Invoice',
    description: 'Untuk menampilkan detail invoice.',
    tags: ['Client / Sales'],
    response: {
        200: type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            invoice: type_provider_typebox_1.Type.String(),
            paymentMethod: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.Literal('cash'),
                type_provider_typebox_1.Type.Literal('transfer'),
            ]),
            paidAt: type_provider_typebox_1.Type.String({ format: 'date' }),
            quantity: type_provider_typebox_1.Type.Integer(),
            address: type_provider_typebox_1.Type.String(),
            order: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                product: type_provider_typebox_1.Type.String(),
                quantity: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                subtotal: type_provider_typebox_1.Type.Number(),
            })),
            price: type_provider_typebox_1.Type.Object({
                submitted: type_provider_typebox_1.Type.Number(),
                bid: type_provider_typebox_1.Type.Number(),
            }),
        }),
    },
};
