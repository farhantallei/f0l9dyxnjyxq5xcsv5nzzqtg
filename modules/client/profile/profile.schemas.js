"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAccountSchema = exports.UpdatePasswordSchema = exports.UpdateProductReviewSchema = exports.GetProductReviewsSchema = exports.UpdateDisplayPictureSchema = exports.UpdateProfileSchema = exports.GetProfileSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.GetProfileSchema = {
    summary: 'Profil',
    description: 'Menampilkan profil user.',
    tags: ['Client / Profile'],
    response: {
        200: type_provider_typebox_1.Type.Object({
            name: type_provider_typebox_1.Type.String(),
            email: type_provider_typebox_1.Type.String({ format: 'email' }),
            mobile: type_provider_typebox_1.Type.String(),
            profileUrl: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                type_provider_typebox_1.Type.Null(),
            ]),
        }),
    },
};
exports.UpdateProfileSchema = {
    summary: 'Perbarui Profil',
    description: 'Untuk memperbarui profil user.',
    tags: ['Client / Profile'],
    body: type_provider_typebox_1.Type.Object({
        name: type_provider_typebox_1.Type.String(),
        email: type_provider_typebox_1.Type.String({ format: 'email' }),
        mobile: type_provider_typebox_1.Type.String(),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.UpdateDisplayPictureSchema = {
    summary: 'Memperbarui Gambar Profil',
    description: 'Untuk memperbarui gambar profil.',
    tags: ['Client / Profile'],
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.GetProductReviewsSchema = {
    summary: 'Penilaian Produk',
    description: 'Untuk menampilkan daftar produk baik yang dinilai maupun belum dinilai.',
    tags: ['Client / Profile'],
    response: {
        200: type_provider_typebox_1.Type.Object({
            unrated: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
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
            rated: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String({}),
                profileUrl: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                    type_provider_typebox_1.Type.Null(),
                ]),
                rate: type_provider_typebox_1.Type.Integer({ minimum: 1, maximum: 5 }),
                createdAt: type_provider_typebox_1.Type.Number(),
                review: type_provider_typebox_1.Type.String(),
                product: type_provider_typebox_1.Type.Object({
                    name: type_provider_typebox_1.Type.String(),
                    imageUrl: type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                }),
            })),
        }),
    },
};
exports.UpdateProductReviewSchema = {
    summary: 'Memperbarui Review Produk',
    description: 'Untuk mengedit nilai produk yang telah direview.',
    tags: ['Client / Profile'],
    body: type_provider_typebox_1.Type.Object({
        rate: type_provider_typebox_1.Type.Integer({ minimum: 1, maximum: 5 }),
        review: type_provider_typebox_1.Type.String(),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.UpdatePasswordSchema = {
    summary: 'Ganti Password',
    description: 'Untuk mengubah password.',
    tags: ['Client / Profile'],
    body: type_provider_typebox_1.Type.Object({
        oldPassword: type_provider_typebox_1.Type.String({ minLength: 6 }),
        newPassword: type_provider_typebox_1.Type.String({ minLength: 6 }),
        confirmPassword: type_provider_typebox_1.Type.String({ minLength: 6 }),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.DeleteAccountSchema = {
    summary: 'Hapus Akun',
    description: 'Untuk hapus akun.',
    tags: ['Client / Profile'],
    params: type_provider_typebox_1.Type.Object({
        token64: type_provider_typebox_1.Type.String(),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
