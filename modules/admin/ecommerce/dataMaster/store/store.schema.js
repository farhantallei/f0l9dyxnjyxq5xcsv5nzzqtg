"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStoreSchema = exports.ListStoresSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListStoresSchema = {
    summary: 'Daftar Store Produk',
    description: 'Ini tuh untuk ngambil data store',
    tags: ['Admin.E-Commerce.DataMaster.Store'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
            address: type_provider_typebox_1.Type.String(),
            province: type_provider_typebox_1.Type.String(),
            regency: type_provider_typebox_1.Type.String(),
            district: type_provider_typebox_1.Type.String(),
            village: type_provider_typebox_1.Type.String(),
            zipCode: type_provider_typebox_1.Type.String(),
            center: type_provider_typebox_1.Type.Boolean(),
            profileUrl: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.String(), type_provider_typebox_1.Type.Null()]),
        })),
    },
};
exports.CreateStoreSchema = {
    summary: 'Buat Store',
    description: 'Ini tuh untuk membuat akun store',
    tags: ['Admin.E-Commerce.DataMaster.Store'],
    body: type_provider_typebox_1.Type.Object({
        name: type_provider_typebox_1.Type.String(),
        address: type_provider_typebox_1.Type.String(),
        province: type_provider_typebox_1.Type.String(),
        regency: type_provider_typebox_1.Type.String(),
        district: type_provider_typebox_1.Type.String(),
        village: type_provider_typebox_1.Type.String(),
        zipCode: type_provider_typebox_1.Type.String(),
    }),
    response: { 204: type_provider_typebox_1.Type.Undefined() },
};
