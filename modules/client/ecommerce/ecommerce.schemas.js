"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCheckoutSchema = exports.GetHomeSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.GetHomeSchema = {
    summary: 'Home',
    description: 'Untuk menampilkan data yang dibutuhkan dalam halaman utama.',
    tags: ['Client / E-Commerce'],
    response: {
        200: type_provider_typebox_1.Type.Object({
            categories: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
            })),
            promotion: type_provider_typebox_1.Type.Object({
                banners: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                    id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                    url: type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                })),
                schedule: type_provider_typebox_1.Type.Object({
                    id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                    url: type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                }),
            }),
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
exports.GetCheckoutSchema = {
    summary: 'Checkout',
    description: 'Untuk menampilkan data yang dibutuhkan dalam halaman utama.',
    tags: ['Client / E-Commerce'],
    response: {
        200: type_provider_typebox_1.Type.Object({
            vouchers: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                discount: type_provider_typebox_1.Type.Number(),
            })),
            shipments: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.String()),
            paymentMethod: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.Literal('cash'),
                type_provider_typebox_1.Type.Literal('transfer'),
            ]),
        }),
    },
};
