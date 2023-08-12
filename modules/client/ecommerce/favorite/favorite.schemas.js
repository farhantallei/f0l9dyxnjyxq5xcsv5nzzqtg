"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFavoriteProductSchema = exports.AddFavoriteProductSchema = exports.ListFavoriteProductsSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListFavoriteProductsSchema = {
    summary: 'Daftar Favorit Produk',
    description: 'Daftar produk yang difavorit User.',
    tags: ['Client / E-Commerce'],
    querystring: type_provider_typebox_1.Type.Object({
        categoryId: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.Integer({ minimum: 1 })),
    }),
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
            price: type_provider_typebox_1.Type.Number(),
            category: type_provider_typebox_1.Type.String(),
            thumbnailUrl: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                type_provider_typebox_1.Type.Null(),
            ]),
        })),
    },
};
exports.AddFavoriteProductSchema = {
    summary: 'Menambah Produk ke Favorit',
    description: 'Untuk menambahkan produk ke favorit User.',
    tags: ['Client / E-Commerce'],
    body: type_provider_typebox_1.Type.Object({
        productId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            statusCode: type_provider_typebox_1.Type.Literal(200),
            message: type_provider_typebox_1.Type.Literal('Success'),
        }),
    },
};
exports.DeleteFavoriteProductSchema = {
    summary: 'Menghapus Favorit Produk',
    description: 'Untuk menghapus Produk dari Favorit.',
    tags: ['Client / E-Commerce'],
    params: type_provider_typebox_1.Type.Object({
        productId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            statusCode: type_provider_typebox_1.Type.Literal(200),
            message: type_provider_typebox_1.Type.Literal('Success'),
        }),
    },
};
