"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrderDetailsSchema = exports.GetInvoiceSchema = exports.ListOrdersSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListOrdersSchema = {
    summary: 'Daftar Pesanan E-commerce',
    description: 'Untuk menampilkan produk yang dipesan.',
    tags: ['Client / E-Commerce'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            checkout: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
                regency: type_provider_typebox_1.Type.String(),
                products: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                    id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                    name: type_provider_typebox_1.Type.String(),
                    category: type_provider_typebox_1.Type.String(),
                    thumbnailUrl: type_provider_typebox_1.Type.Union([
                        type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                        type_provider_typebox_1.Type.Null(),
                    ]),
                    quantity: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                    totalPrice: type_provider_typebox_1.Type.Number(),
                })),
            })),
            shipping: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
                regency: type_provider_typebox_1.Type.String(),
                products: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                    id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                    name: type_provider_typebox_1.Type.String(),
                    category: type_provider_typebox_1.Type.String(),
                    thumbnailUrl: type_provider_typebox_1.Type.Union([
                        type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                        type_provider_typebox_1.Type.Null(),
                    ]),
                    quantity: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                    totalPrice: type_provider_typebox_1.Type.Number(),
                })),
            })),
            aborted: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
                regency: type_provider_typebox_1.Type.String(),
                products: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                    id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                    name: type_provider_typebox_1.Type.String(),
                    category: type_provider_typebox_1.Type.String(),
                    thumbnailUrl: type_provider_typebox_1.Type.Union([
                        type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                        type_provider_typebox_1.Type.Null(),
                    ]),
                    quantity: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                    totalPrice: type_provider_typebox_1.Type.Number(),
                })),
            })),
            complete: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
                regency: type_provider_typebox_1.Type.String(),
                products: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                    id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                    name: type_provider_typebox_1.Type.String(),
                    category: type_provider_typebox_1.Type.String(),
                    thumbnailUrl: type_provider_typebox_1.Type.Union([
                        type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                        type_provider_typebox_1.Type.Null(),
                    ]),
                    quantity: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                    totalPrice: type_provider_typebox_1.Type.Number(),
                })),
            })),
        })),
    },
};
exports.GetInvoiceSchema = {
    summary: 'Invoice',
    description: 'Untuk menampilkan detail invoice.',
    tags: ['Client / E-Commerce'],
    params: type_provider_typebox_1.Type.Object({
        id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            invoice: type_provider_typebox_1.Type.String(),
            paymentMethod: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.Literal('cash'),
                type_provider_typebox_1.Type.Literal('transfer'),
            ]),
            paidAt: type_provider_typebox_1.Type.String({ format: 'date' }),
            amount: type_provider_typebox_1.Type.Number(),
            address: type_provider_typebox_1.Type.String(),
            order: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                product: type_provider_typebox_1.Type.String(),
                quantity: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                subtotal: type_provider_typebox_1.Type.Number(),
            })),
            price: type_provider_typebox_1.Type.Object({
                subtotal: type_provider_typebox_1.Type.Number(),
                discount: type_provider_typebox_1.Type.Number(),
                total: type_provider_typebox_1.Type.Number(),
            }),
        }),
    },
};
exports.GetOrderDetailsSchema = {
    summary: 'Detail Order',
    description: 'Untuk menampilkan detail order.',
    tags: ['Client / E-Commerce'],
    response: {
        200: type_provider_typebox_1.Type.Object({
            address: type_provider_typebox_1.Type.String(),
            products: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                name: type_provider_typebox_1.Type.String(),
                category: type_provider_typebox_1.Type.String(),
                thumbnailUrl: type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                quantity: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                price: type_provider_typebox_1.Type.Number(),
            })),
            price: type_provider_typebox_1.Type.Object({
                subtotal: type_provider_typebox_1.Type.Number(),
                shipping: type_provider_typebox_1.Type.Number(),
                discount: type_provider_typebox_1.Type.Number(),
                total: type_provider_typebox_1.Type.Number(),
            }),
            paymentMethod: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.Literal('cash'),
                type_provider_typebox_1.Type.Literal('transfer'),
            ]),
            invoice: type_provider_typebox_1.Type.String(),
            log: type_provider_typebox_1.Type.Object({
                checkout: type_provider_typebox_1.Type.Number(),
                paid: type_provider_typebox_1.Type.Number(),
                shipping: type_provider_typebox_1.Type.Number(),
                complete: type_provider_typebox_1.Type.Number(),
            }),
        }),
    },
};
