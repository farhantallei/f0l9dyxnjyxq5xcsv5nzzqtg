"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductSchema = exports.ListProductsSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListProductsSchema = {
    summary: 'Daftar Produk',
    description: 'Ini tuh untuk ngambil data produk',
    tags: ['Admin.E-Commerce.DataMaster.Product'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            brandId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            categoryId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
            description: type_provider_typebox_1.Type.String(),
            price: type_provider_typebox_1.Type.Number(),
            type: type_provider_typebox_1.Type.String(),
            createdAt: type_provider_typebox_1.Type.Number(),
            updatedAt: type_provider_typebox_1.Type.Number(),
        })),
    },
};
exports.CreateProductSchema = {
    summary: 'Buat Produk',
    description: 'Ini tuh untuk membuat produk',
    tags: ['Admin.E-Commerce.DataMaster.product'],
    body: type_provider_typebox_1.Type.Object({
        brandId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        categoryId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        name: type_provider_typebox_1.Type.String(),
        description: type_provider_typebox_1.Type.String(),
        price: type_provider_typebox_1.Type.Number(),
        type: type_provider_typebox_1.Type.String(),
    }),
    response: { 204: type_provider_typebox_1.Type.Undefined() },
};
