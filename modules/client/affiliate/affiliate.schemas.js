"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataVerificationSchema = exports.UpdatePasswordSchema = exports.UpdateDisplayPictureSchema = exports.UpdateProfileSchema = exports.GetProfileSchema = exports.GetInvoiceSchema = exports.GetPaymentDetailsSchema = exports.GetRecruitDetailsSchema = exports.CreateCashDisbursedSchema = exports.CreateTransferDisbursedSchema = exports.GetPaymentSchema = exports.GetNotificationsSchema = exports.GetRecruitsSchema = exports.GetHomeSchema = exports.RegisterSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.RegisterSchema = {
    summary: 'Daftar Affiliator',
    description: 'Untuk mendaftar menjadi affiliator.',
    tags: ['Client / Affiliate'],
    body: type_provider_typebox_1.Type.Object({
        name: type_provider_typebox_1.Type.String(),
        mobile: type_provider_typebox_1.Type.String(),
        email: type_provider_typebox_1.Type.String({ format: 'email' }),
        community: type_provider_typebox_1.Type.String(),
        totalMemberCount: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        potentialLandArea: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            name: type_provider_typebox_1.Type.String(),
            verified: type_provider_typebox_1.Type.Boolean(),
            meta: type_provider_typebox_1.Type.Object({
                memberCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
                hectareTotal: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
                commission: type_provider_typebox_1.Type.Number({ minimum: 0 }),
            }),
        }),
    },
};
exports.GetHomeSchema = {
    summary: 'Home',
    description: 'Untuk menampilkan data yang dibutuhkan dalam halaman utama.',
    tags: ['Client / Affiliate'],
    response: {
        200: type_provider_typebox_1.Type.Object({
            profileUrl: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                type_provider_typebox_1.Type.Null(),
            ]),
            recruits: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String({ examples: ['Jajang Sutarjo'] }),
                totalLandArea: type_provider_typebox_1.Type.Number({ minimum: 0 }),
                createdAt: type_provider_typebox_1.Type.Number(),
                profileUrl: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                    type_provider_typebox_1.Type.Null(),
                ]),
            })),
        }),
    },
};
exports.GetRecruitsSchema = {
    summary: 'Rekrutan',
    description: 'Untuk menampilkan data yang dibutuhkan dalam halaman rekrutan.',
    tags: ['Client / Affiliate'],
    response: {
        200: type_provider_typebox_1.Type.Object({
            memberCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
            members: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String({ examples: ['Jajang Sutarjo'] }),
                totalLandArea: type_provider_typebox_1.Type.Number({ minimum: 0 }),
                createdAt: type_provider_typebox_1.Type.Number(),
                profileUrl: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                    type_provider_typebox_1.Type.Null(),
                ]),
            })),
        }),
    },
};
exports.GetNotificationsSchema = {
    summary: 'Notifikasi',
    description: 'Untuk menampilkan data yang dibutuhkan dalam halaman notifikasi.',
    tags: ['Client / Affiliate'],
    response: {
        200: type_provider_typebox_1.Type.Object({
            notifications: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                type: type_provider_typebox_1.Type.String(),
                createdAt: type_provider_typebox_1.Type.Number(),
            })),
        }),
    },
};
exports.GetPaymentSchema = {
    summary: 'Pembayaran',
    description: 'Untuk menampilkan data yang dibutuhkan dalam halaman pembayaran.',
    tags: ['Client / Affiliate'],
    response: {
        200: type_provider_typebox_1.Type.Object({
            disbursedAmount: type_provider_typebox_1.Type.Number({ minimum: 0 }),
            transactions: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                createdAt: type_provider_typebox_1.Type.Number(),
                method: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Literal('cash'), type_provider_typebox_1.Type.Literal('transfer')]),
                amount: type_provider_typebox_1.Type.Number(),
                status: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.Literal('success'),
                    type_provider_typebox_1.Type.Literal('wait'),
                    type_provider_typebox_1.Type.Literal('fail'),
                ]),
            })),
        }),
    },
};
exports.CreateTransferDisbursedSchema = {
    summary: 'Buat Pencairan Ke Rekening',
    description: 'Untuk mencairkan komisi ke rekening.',
    tags: ['Client / Affiliate'],
    body: type_provider_typebox_1.Type.Object({
        name: type_provider_typebox_1.Type.String(),
        bank: type_provider_typebox_1.Type.String(),
        accountNumber: type_provider_typebox_1.Type.String(),
        amount: type_provider_typebox_1.Type.Number({ minimum: 0 }),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.CreateCashDisbursedSchema = {
    summary: 'Buat Pencairan Tunai',
    description: 'Untuk mencairkan komisi secara tunai.',
    tags: ['Client / Affiliate'],
    body: type_provider_typebox_1.Type.Object({
        amount: type_provider_typebox_1.Type.Number({ minimum: 0 }),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.GetRecruitDetailsSchema = {
    summary: 'Detail Rekrutan',
    description: 'Untuk menampilkan data rekrutan secara detail.',
    tags: ['Client / Affiliate'],
    params: type_provider_typebox_1.Type.Object({
        id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            name: type_provider_typebox_1.Type.String(),
            createdAt: type_provider_typebox_1.Type.Number(),
            totalLandArea: type_provider_typebox_1.Type.Number(),
            cropCommodity: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Literal('padi'), type_provider_typebox_1.Type.Literal('jagung')])),
            domicileAddress: type_provider_typebox_1.Type.String(),
            landAddress: type_provider_typebox_1.Type.String(),
        }),
    },
};
exports.GetPaymentDetailsSchema = {
    summary: 'Detail Pembayaran',
    description: 'Untuk menampilkan data pembayaran secara detail.',
    tags: ['Client / Affiliate'],
    params: type_provider_typebox_1.Type.Object({
        id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Union([
            type_provider_typebox_1.Type.Object({
                createdAt: type_provider_typebox_1.Type.Number(),
                method: type_provider_typebox_1.Type.Literal('transfer'),
                amount: type_provider_typebox_1.Type.Number(),
                status: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.Literal('wait'),
                    type_provider_typebox_1.Type.Literal('fail'),
                ]),
                disbursedId: type_provider_typebox_1.Type.String(),
                account: type_provider_typebox_1.Type.Object({
                    name: type_provider_typebox_1.Type.String(),
                    bank: type_provider_typebox_1.Type.String(),
                    accountNumber: type_provider_typebox_1.Type.String(),
                }),
            }),
            type_provider_typebox_1.Type.Object({
                createdAt: type_provider_typebox_1.Type.Number(),
                method: type_provider_typebox_1.Type.Literal('cash'),
                amount: type_provider_typebox_1.Type.Number(),
                status: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.Literal('wait'),
                    type_provider_typebox_1.Type.Literal('fail'),
                ]),
                disbursedId: type_provider_typebox_1.Type.String(),
                name: type_provider_typebox_1.Type.String(),
            }),
            type_provider_typebox_1.Type.Object({
                deliveredAt: type_provider_typebox_1.Type.Number(),
                method: type_provider_typebox_1.Type.Literal('transfer'),
                amount: type_provider_typebox_1.Type.Number(),
                status: type_provider_typebox_1.Type.Literal('success'),
                disbursedId: type_provider_typebox_1.Type.String(),
                account: type_provider_typebox_1.Type.Object({
                    name: type_provider_typebox_1.Type.String(),
                    bank: type_provider_typebox_1.Type.String(),
                    accountNumber: type_provider_typebox_1.Type.String(),
                }),
                lastPayments: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                    createdAt: type_provider_typebox_1.Type.Number(),
                    method: type_provider_typebox_1.Type.Union([
                        type_provider_typebox_1.Type.Literal('cash'),
                        type_provider_typebox_1.Type.Literal('transfer'),
                    ]),
                    amount: type_provider_typebox_1.Type.Number(),
                    status: type_provider_typebox_1.Type.Union([
                        type_provider_typebox_1.Type.Literal('success'),
                        type_provider_typebox_1.Type.Literal('wait'),
                        type_provider_typebox_1.Type.Literal('fail'),
                    ]),
                })),
            }),
            type_provider_typebox_1.Type.Object({
                deliveredAt: type_provider_typebox_1.Type.Number(),
                method: type_provider_typebox_1.Type.Literal('cash'),
                amount: type_provider_typebox_1.Type.Number(),
                status: type_provider_typebox_1.Type.Literal('success'),
                disbursedId: type_provider_typebox_1.Type.String(),
                name: type_provider_typebox_1.Type.String(),
                lastPayments: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
                    createdAt: type_provider_typebox_1.Type.Number(),
                    method: type_provider_typebox_1.Type.Union([
                        type_provider_typebox_1.Type.Literal('cash'),
                        type_provider_typebox_1.Type.Literal('transfer'),
                    ]),
                    amount: type_provider_typebox_1.Type.Number(),
                    status: type_provider_typebox_1.Type.Union([
                        type_provider_typebox_1.Type.Literal('success'),
                        type_provider_typebox_1.Type.Literal('wait'),
                        type_provider_typebox_1.Type.Literal('fail'),
                    ]),
                })),
            }),
        ]),
    },
};
exports.GetInvoiceSchema = {
    summary: 'Invoice',
    description: 'Untuk mendapatkan invoice dari pencairan yang berhasil.',
    tags: ['Client / Affiliate'],
    response: {
        200: type_provider_typebox_1.Type.Union([
            type_provider_typebox_1.Type.Object({
                deliveredAt: type_provider_typebox_1.Type.Number(),
                method: type_provider_typebox_1.Type.Literal('cash'),
                amount: type_provider_typebox_1.Type.Number({ minimum: 0 }),
                total: type_provider_typebox_1.Type.Number({ minimum: 0 }),
            }),
            type_provider_typebox_1.Type.Object({
                deliveredAt: type_provider_typebox_1.Type.Number(),
                method: type_provider_typebox_1.Type.Literal('transfer'),
                amount: type_provider_typebox_1.Type.Number({ minimum: 0 }),
                total: type_provider_typebox_1.Type.Number({ minimum: 0 }),
                account: type_provider_typebox_1.Type.Object({
                    name: type_provider_typebox_1.Type.String(),
                    bank: type_provider_typebox_1.Type.String(),
                    accountNumber: type_provider_typebox_1.Type.String(),
                }),
            }),
        ]),
    },
};
exports.GetProfileSchema = {
    summary: 'Akun',
    description: 'Untuk menampilkan data yang dibutuhkan dalam halaman akun saya.',
    tags: ['Client / Affiliate'],
    response: {
        200: type_provider_typebox_1.Type.Object({
            name: type_provider_typebox_1.Type.String(),
            verified: type_provider_typebox_1.Type.Boolean(),
            mobile: type_provider_typebox_1.Type.String(),
            domicileAddress: type_provider_typebox_1.Type.String(),
            communityName: type_provider_typebox_1.Type.String(),
            cropCommodity: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Literal('padi'), type_provider_typebox_1.Type.Literal('jagung')])),
            profileUrl: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                type_provider_typebox_1.Type.Null(),
            ]),
        }),
    },
};
exports.UpdateProfileSchema = {
    summary: 'Ubah Data Diri',
    description: 'Untuk mengubah data diri.',
    tags: ['Client / Affiliate'],
    body: type_provider_typebox_1.Type.Object({
        name: type_provider_typebox_1.Type.String(),
        mobile: type_provider_typebox_1.Type.String(),
        email: type_provider_typebox_1.Type.String({ format: 'email' }),
        domicileAddress: type_provider_typebox_1.Type.String(),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.UpdateDisplayPictureSchema = {
    summary: 'Memperbarui Gambar Profil',
    description: 'Untuk memperbarui gambar profil.',
    tags: ['Client / Affiliate'],
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.UpdatePasswordSchema = {
    summary: 'Ubah Password',
    description: 'Untuk mengubah password.',
    tags: ['Client / Affiliate'],
    body: type_provider_typebox_1.Type.Object({
        oldPassword: type_provider_typebox_1.Type.String(),
        newPassword: type_provider_typebox_1.Type.String(),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.DataVerificationSchema = {
    summary: 'Verifikasi Data Diri',
    description: 'Untuk verifikasi data diri.',
    tags: ['Client / Affiliate'],
    body: type_provider_typebox_1.Type.Object({
        selfiePicture: type_provider_typebox_1.Type.String(),
        name: type_provider_typebox_1.Type.String(),
        mobile: type_provider_typebox_1.Type.String(),
        domicileAddress: type_provider_typebox_1.Type.String(),
        ktpAddress: type_provider_typebox_1.Type.String(),
        ktpPicture: type_provider_typebox_1.Type.String(),
        kkPicture: type_provider_typebox_1.Type.String(),
        ktpNumber: type_provider_typebox_1.Type.String(),
        kkNumber: type_provider_typebox_1.Type.String(),
        email: type_provider_typebox_1.Type.String(),
        community: type_provider_typebox_1.Type.Object({
            Name: type_provider_typebox_1.Type.String(),
            totalMember: type_provider_typebox_1.Type.Integer(),
            potentialLandArea: type_provider_typebox_1.Type.Integer(),
            communityAddress: type_provider_typebox_1.Type.String(),
            cropCommodity: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Literal('padi'), type_provider_typebox_1.Type.Literal('jagung')]), { uniqueItems: true, maxItems: 2 }),
        }),
        landAddress: type_provider_typebox_1.Type.String(),
        registeredLandArea: type_provider_typebox_1.Type.Integer(),
        cropCommodity: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Literal('padi'), type_provider_typebox_1.Type.Literal('jagung')]), { uniqueItems: true, maxItems: 2 }),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
