"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductReviewSchema = exports.CreateCheckoutSchema = exports.GetProductReviewsSchema = exports.GetProductOutletsSchema = exports.GetProductDetailsSchema = exports.ListProductsSchema = exports.ListCategoriesSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListCategoriesSchema = {
    summary: 'Daftar Kategori Produk',
    description: 'Daftar seluruh kategori produk.',
    tags: ['Client / E-Commerce'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            category: type_provider_typebox_1.Type.String(),
        })),
    },
};
exports.ListProductsSchema = {
    summary: 'Daftar Produk',
    description: 'Daftar produk, defaultnya hanya menampilkan 4 item. Atur limit untuk mengubah.',
    tags: ['Client / E-Commerce'],
    querystring: type_provider_typebox_1.Type.Object({
        page: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.Integer({ minimum: 1 })),
        limit: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.Integer({ minimum: 1 })),
        categoryId: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.Integer({ minimum: 1 })),
        searchQuery: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.String()),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            products: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
                category: type_provider_typebox_1.Type.String(),
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
        }),
    },
};
exports.GetProductDetailsSchema = {
    summary: 'Product Details',
    description: 'Mengambil data dari produk yang diambil dari id.',
    tags: ['Client / E-Commerce'],
    params: type_provider_typebox_1.Type.Object({
        id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
            category: type_provider_typebox_1.Type.String(),
            price: type_provider_typebox_1.Type.Number(),
            brand: type_provider_typebox_1.Type.String(),
            type: type_provider_typebox_1.Type.String(),
            outlets: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
                stock: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
            })),
            description: type_provider_typebox_1.Type.String(),
            rating: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Number(), type_provider_typebox_1.Type.Null()]),
            meta: type_provider_typebox_1.Type.Object({
                reviewCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
                sold: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
            }),
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
            favorited: type_provider_typebox_1.Type.Boolean(),
        }),
    },
};
exports.GetProductOutletsSchema = {
    summary: 'Product Outlet',
    description: 'Mendapatkan list toko yang memiliki produk.',
    tags: ['Client / E-Commerce'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
            address: type_provider_typebox_1.Type.String(),
        })),
    },
};
exports.GetProductReviewsSchema = {
    summary: 'Product Reviews',
    description: 'Daftar seluruh review dari produk yang diambil dari id.',
    tags: ['Client / E-Commerce'],
    params: type_provider_typebox_1.Type.Object({
        id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    querystring: type_provider_typebox_1.Type.Object({
        page: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.Integer({ minimum: 1 })),
        limit: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.Integer({ minimum: 1 })),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            prev: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.Object({
                    page: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                    limit: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                }),
                type_provider_typebox_1.Type.Null(),
            ]),
            next: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.Object({
                    page: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                    limit: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                }),
                type_provider_typebox_1.Type.Null(),
            ]),
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
        }),
    },
};
exports.CreateCheckoutSchema = {
    summary: 'Membuat Pembayaran Produk',
    description: 'Untuk membuat checkout produk.',
    tags: ['Client / E-Commerce'],
    params: type_provider_typebox_1.Type.Object({
        id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    body: type_provider_typebox_1.Type.Object({
        addressId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        voucherId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        delivery: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Literal('cod')]),
        paymentMethod: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Literal('cash'), type_provider_typebox_1.Type.Literal('transfer')]),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.CreateProductReviewSchema = {
    summary: 'Membuat Review Produk',
    description: 'Untuk mereview produk yang telah dibeli.',
    tags: ['Client / E-Commerce'],
    params: type_provider_typebox_1.Type.Object({
        id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    body: type_provider_typebox_1.Type.Object({
        quality: type_provider_typebox_1.Type.Integer({ minimum: 1, maximum: 5 }),
        service: type_provider_typebox_1.Type.Integer({ minimum: 1, maximum: 5 }),
        delivery: type_provider_typebox_1.Type.Integer({ minimum: 1, maximum: 5 }),
        review: type_provider_typebox_1.Type.String(),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
