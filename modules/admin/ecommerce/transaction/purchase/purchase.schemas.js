"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRefusedSchema = exports.ListCompleteSchema = exports.ListBoughtSchema = exports.ListProductSubmissionSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListProductSubmissionSchema = {
    summary: 'Daftar Pengajuan Produk',
    description: 'Untuk menampilkan daftar pengajuan produk.',
    tags: ['Admin / E-Commerce / Transaction / Purchase'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            invoice: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
            product: type_provider_typebox_1.Type.String(),
            price: type_provider_typebox_1.Type.Number(),
            weight: type_provider_typebox_1.Type.Number(),
            createdAt: type_provider_typebox_1.Type.Number(),
        })),
    },
};
exports.ListBoughtSchema = {
    summary: 'Daftar Dibeli',
    description: 'Untuk menampilkan daftar dibeli.',
    tags: ['Admin / E-Commerce / Transaction / Purchase'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            invoice: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
            product: type_provider_typebox_1.Type.String(),
            price: type_provider_typebox_1.Type.Number(),
            weight: type_provider_typebox_1.Type.Number(),
            createdAt: type_provider_typebox_1.Type.Number(),
        })),
    },
};
exports.ListCompleteSchema = {
    summary: 'Daftar Selesai',
    description: 'Untuk menampilkan daftar selesai.',
    tags: ['Admin / E-Commerce / Transaction / Purchase'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            invoice: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
            product: type_provider_typebox_1.Type.String(),
            price: type_provider_typebox_1.Type.Number(),
            weight: type_provider_typebox_1.Type.Number(),
            createdAt: type_provider_typebox_1.Type.Number(),
        })),
    },
};
exports.ListRefusedSchema = {
    summary: 'Daftar Ditolak',
    description: 'Untuk menampilkan daftar ditolak.',
    tags: ['Admin / E-Commerce / Transaction / Purchase'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            invoice: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
            product: type_provider_typebox_1.Type.String(),
            price: type_provider_typebox_1.Type.Number(),
            weight: type_provider_typebox_1.Type.Number(),
            createdAt: type_provider_typebox_1.Type.Number(),
        })),
    },
};
