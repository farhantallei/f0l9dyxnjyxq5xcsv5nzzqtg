"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentPlotlyProductSchema = exports.RentDailyProductSchema = exports.GetProductReviewsSchema = exports.GetProductDetailsSchema = exports.ListProductsSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListProductsSchema = {
    summary: 'Daftar Alat Pertanian',
    description: 'Untuk menampilkan daftar alat pertanian.',
    tags: ['Client / Alsintan'],
    querystring: type_provider_typebox_1.Type.Object({
        page: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.Integer({ minimum: 1 })),
        limit: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.Integer({ minimum: 1 })),
        searchQuery: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.String()),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            products: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
                rentalType: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.Literal('daily'),
                    type_provider_typebox_1.Type.Literal('plotly'),
                ]),
                price: type_provider_typebox_1.Type.Number(),
                rating: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Number(), type_provider_typebox_1.Type.Null()]),
                thumbnailUrl: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                    type_provider_typebox_1.Type.Null(),
                ]),
                sold: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
            })),
            prevPage: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Integer(), type_provider_typebox_1.Type.Null()]),
            nextPage: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Integer(), type_provider_typebox_1.Type.Null()]),
        }, { description: 'rentalType: [daily, plotly]' }),
    },
};
exports.GetProductDetailsSchema = {
    summary: 'Detail Alat Pertanian',
    description: 'Untuk menampilkan detail alat mesin pertanian.',
    tags: ['Client / Alsintan'],
    params: type_provider_typebox_1.Type.Object({
        productId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
            category: type_provider_typebox_1.Type.String(),
            rentalType: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Literal('daily'), type_provider_typebox_1.Type.Literal('plotly')]),
            price: type_provider_typebox_1.Type.Number(),
            description: type_provider_typebox_1.Type.String(),
            reviews: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
                profileUrl: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                    type_provider_typebox_1.Type.Null(),
                ]),
                rating: type_provider_typebox_1.Type.Integer(),
                review: type_provider_typebox_1.Type.String(),
                createdAt: type_provider_typebox_1.Type.Number(),
                images: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                    id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                    url: type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                })),
            })),
            images: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
                url: type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
            })),
            meta: type_provider_typebox_1.Type.Object({
                reviewCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
            }),
        }),
    },
};
exports.GetProductReviewsSchema = {
    summary: 'Daftar Review Alat Pertanian',
    description: 'Untuk menampilkan daftar review Alat Pertanian.',
    tags: ['Client / Alsintan'],
    params: type_provider_typebox_1.Type.Object({
        productId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    querystring: type_provider_typebox_1.Type.Object({
        page: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.Integer({ minimum: 1 })),
        limit: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.Integer({ minimum: 1 })),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            reviews: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
                profileUrl: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                    type_provider_typebox_1.Type.Null(),
                ]),
                rating: type_provider_typebox_1.Type.Integer(),
                review: type_provider_typebox_1.Type.String(),
                createdAt: type_provider_typebox_1.Type.Number(),
                images: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                    id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                    url: type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                })),
            })),
            prevPage: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Integer(), type_provider_typebox_1.Type.Null()]),
            nextPage: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Integer(), type_provider_typebox_1.Type.Null()]),
        }),
    },
};
exports.RentDailyProductSchema = {
    summary: 'Sewa Alat Pertanian Harian',
    description: 'Untuk menyewa Alat Pertanian yang disewa per hari.',
    tags: ['Client / Alsintan'],
    params: type_provider_typebox_1.Type.Object({
        productId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    body: type_provider_typebox_1.Type.Object({
        landAddress: type_provider_typebox_1.Type.String(),
        from: type_provider_typebox_1.Type.String({ format: 'date' }),
        to: type_provider_typebox_1.Type.String({ format: 'date' }),
        landAreaTotal: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        userAddressId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        paymentMethod: type_provider_typebox_1.Type.Union([
            type_provider_typebox_1.Type.Literal('cash'),
            type_provider_typebox_1.Type.Literal('bank_transfer'),
        ]),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.RentPlotlyProductSchema = {
    summary: 'Sewa Alat Pertanian Petakan',
    description: 'Untuk menyewa Alat Pertanian yang disewa per petak.',
    tags: ['Client / Alsintan'],
    params: type_provider_typebox_1.Type.Object({
        productId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    body: type_provider_typebox_1.Type.Object({
        landAddress: type_provider_typebox_1.Type.String(),
        from: type_provider_typebox_1.Type.String({ format: 'date' }),
        plot: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        landAreaTotal: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        userAddressId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        paymentMethod: type_provider_typebox_1.Type.Union([
            type_provider_typebox_1.Type.Literal('cash'),
            type_provider_typebox_1.Type.Literal('bank_transfer'),
        ]),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
