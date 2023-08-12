"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCashPaymentMethodSchema = exports.GetTransferPaymentMethodSchema = exports.GetOrderDetailsSchema = exports.ListOrdersSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListOrdersSchema = {
    summary: 'Daftar Pesanan Alsintan',
    description: 'Untuk menampilkan pesanan alsintan.',
    tags: ['Client / Alsintan'],
    querystring: type_provider_typebox_1.Type.Object({
        status: type_provider_typebox_1.Type.Union([
            type_provider_typebox_1.Type.Literal('requested'),
            type_provider_typebox_1.Type.Literal('approved'),
            type_provider_typebox_1.Type.Literal('rented'),
            type_provider_typebox_1.Type.Literal('completed'),
            type_provider_typebox_1.Type.Literal('canceled'),
        ], { description: '[requested, approved, rented, completed, canceled]' }),
        page: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.Integer({ minimum: 1 })),
        limit: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.Integer({ minimum: 1 })),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            orders: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
                rentalType: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.Literal('daily'),
                    type_provider_typebox_1.Type.Literal('plotly'),
                ]),
                status: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.Literal('requested'),
                    type_provider_typebox_1.Type.Literal('approved'),
                    type_provider_typebox_1.Type.Literal('rented'),
                    type_provider_typebox_1.Type.Literal('completed'),
                    type_provider_typebox_1.Type.Literal('canceled'),
                ]),
                details: type_provider_typebox_1.Type.Object({
                    total: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                    landAreaTotal: type_provider_typebox_1.Type.Number({ minimum: 1 }),
                    from: type_provider_typebox_1.Type.Number(),
                    to: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Number(), type_provider_typebox_1.Type.Null()]),
                }),
                payment: type_provider_typebox_1.Type.Object({
                    method: type_provider_typebox_1.Type.Union([
                        type_provider_typebox_1.Type.Literal('cash'),
                        type_provider_typebox_1.Type.Literal('bank_transfer'),
                    ]),
                    status: type_provider_typebox_1.Type.Union([
                        type_provider_typebox_1.Type.Literal('not_paid'),
                        type_provider_typebox_1.Type.Literal('pending_verification'),
                        type_provider_typebox_1.Type.Literal('completed'),
                    ]),
                    total: type_provider_typebox_1.Type.Number({ minimum: 0 }),
                }),
                thumbnailUrl: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                    type_provider_typebox_1.Type.Null(),
                ]),
            }), {
                description: 'Properti total merupakan total hari/petak. Properti from bisa digunakan untuk tipe harian dan petak.',
            }),
            prevPage: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Integer(), type_provider_typebox_1.Type.Null()]),
            nextPage: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Integer(), type_provider_typebox_1.Type.Null()]),
        }),
    },
};
exports.GetOrderDetailsSchema = {
    summary: 'Detail Pesanan Alsintan',
    description: 'Untuk menampilkan detail pesanan Alsintan.',
    tags: ['Client / Alsintan'],
    params: type_provider_typebox_1.Type.Object({ orderId: type_provider_typebox_1.Type.Integer({ minimum: 1 }) }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
            price: type_provider_typebox_1.Type.Number({ minimum: 0 }),
            rentalType: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Literal('daily'), type_provider_typebox_1.Type.Literal('plotly')]),
            status: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.Literal('requested'),
                type_provider_typebox_1.Type.Literal('approved'),
                type_provider_typebox_1.Type.Literal('rented'),
                type_provider_typebox_1.Type.Literal('completed'),
                type_provider_typebox_1.Type.Literal('canceled'),
            ]),
            from: type_provider_typebox_1.Type.Number(),
            to: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Number(), type_provider_typebox_1.Type.Null()]),
            plot: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Integer({ minimum: 1 }), type_provider_typebox_1.Type.Null()]),
            landAddress: type_provider_typebox_1.Type.String(),
            payment: type_provider_typebox_1.Type.Object({
                method: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.Literal('cash'),
                    type_provider_typebox_1.Type.Literal('bank_transfer'),
                ]),
                status: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.Literal('not_paid'),
                    type_provider_typebox_1.Type.Literal('pending_verification'),
                    type_provider_typebox_1.Type.Literal('completed'),
                ]),
                total: type_provider_typebox_1.Type.Number({ minimum: 0 }),
            }),
            homeAddress: type_provider_typebox_1.Type.String(),
            homeAddressName: type_provider_typebox_1.Type.String(),
            homeAddressMobile: type_provider_typebox_1.Type.String(),
            details: type_provider_typebox_1.Type.Object({
                total: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                landAreaTotal: type_provider_typebox_1.Type.Number({ minimum: 1 }),
            }),
            thumbnailUrl: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                type_provider_typebox_1.Type.Null(),
            ]),
            createdAt: type_provider_typebox_1.Type.Number(),
        }),
    },
};
exports.GetTransferPaymentMethodSchema = {
    summary: 'Instruksi Pembayaran Transfer',
    description: 'Untuk menampilkan data apa saja pada instruksi pembayaran transfer.',
    tags: ['Client / Alsintan'],
    params: type_provider_typebox_1.Type.Object({ orderId: type_provider_typebox_1.Type.Integer({ minimum: 1 }) }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            accounts: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                bankCode: type_provider_typebox_1.Type.String(),
                bankName: type_provider_typebox_1.Type.String(),
                holder: type_provider_typebox_1.Type.String(),
                number: type_provider_typebox_1.Type.String(),
            })),
            amount: type_provider_typebox_1.Type.Number(),
            paymentCode: type_provider_typebox_1.Type.Integer({ minimum: 1, maximum: 999 }),
        }),
    },
};
exports.GetCashPaymentMethodSchema = {
    summary: 'Instruksi Pembayaran Tunai',
    description: 'Untuk menampilkan data apa saja pada instruksi pembayaran tunai.',
    tags: ['Client / Alsintan'],
    params: type_provider_typebox_1.Type.Object({ orderId: type_provider_typebox_1.Type.Integer({ minimum: 1 }) }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            amount: type_provider_typebox_1.Type.Number(),
            paymentCode: type_provider_typebox_1.Type.Integer({ minimum: 1, maximum: 999 }),
            invoiceCode: type_provider_typebox_1.Type.String(),
        }),
    },
};
