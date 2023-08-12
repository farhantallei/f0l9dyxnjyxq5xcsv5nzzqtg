"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCheckoutSchema = exports.DeleteCartProductOutletSchema = exports.DeleteCartProductSchema = exports.UpdateCartProductSchema = exports.AddCartProductSchema = exports.ListCartProductsSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListCartProductsSchema = {
    summary: 'Daftar Keranjang',
    description: 'Daftar produk yang ada di keranjang user dikelompokkan berdasarkan Outlet',
    tags: ['Client / E-Commerce'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
            regency: type_provider_typebox_1.Type.String(),
            products: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
                price: type_provider_typebox_1.Type.Number(),
                category: type_provider_typebox_1.Type.String(),
                thumbnailUrl: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                    type_provider_typebox_1.Type.Null(),
                ]),
                quantity: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            })),
        })),
    },
};
exports.AddCartProductSchema = {
    summary: 'Menambah Produk ke Keranjang',
    description: 'Untuk menambahkan produk ke keranjang User.',
    tags: ['Client / E-Commerce'],
    body: type_provider_typebox_1.Type.Object({
        outletId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        productId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        quantity: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.UpdateCartProductSchema = {
    summary: 'Mengubah Quantity Keranjang',
    description: 'Untuk mengganti quantity di keranjang.',
    tags: ['Client / E-Commerce'],
    body: type_provider_typebox_1.Type.Object({
        outletId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        productId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        quantity: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.DeleteCartProductSchema = {
    summary: 'Menghapus Produk dari Keranjang',
    description: 'Untuk menghapus Produk dari Keranjang.',
    tags: ['Client / E-Commerce'],
    params: type_provider_typebox_1.Type.Object({
        outletId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        productId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            statusCode: type_provider_typebox_1.Type.Literal(200),
            message: type_provider_typebox_1.Type.Literal('Success'),
        }),
    },
};
exports.DeleteCartProductOutletSchema = {
    summary: 'Menghapus Seluruh Produk Berdasarkan Outlet yang Sama',
    description: 'Menghapus Seluruh Produk Berdasarkan Outlet yang Sama.',
    tags: ['Client / E-Commerce'],
    params: type_provider_typebox_1.Type.Object({
        outletId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.CreateCheckoutSchema = {
    summary: 'Membuat Pembayaran Keranjang',
    description: 'Untuk membuat checkout keranjang.',
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
