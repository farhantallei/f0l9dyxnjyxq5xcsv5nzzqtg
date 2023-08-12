"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategorySchema = exports.ListCategorysSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListCategorysSchema = {
    summary: 'Daftar Category Produk',
    description: 'Ini tuh untuk ngambil data category produk',
    tags: ['Admin / E-Commerce / Data Master / Category'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            category: type_provider_typebox_1.Type.String(),
        })),
    },
};
exports.CreateCategorySchema = {
    summary: 'Buat Category Produk',
    description: 'Ini tuh untuk membuat akun category produk',
    tags: ['Admin / E-Commerce / Data Master / Category'],
    body: type_provider_typebox_1.Type.Object({
        category: type_provider_typebox_1.Type.String(),
    }),
    response: { 204: type_provider_typebox_1.Type.Undefined() },
};
