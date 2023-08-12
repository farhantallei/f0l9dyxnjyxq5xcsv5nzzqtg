"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordSchema = exports.ForgotPasswordSchema = exports.RefreshTokenSchema = exports.LogoutSchema = exports.LoginSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.LoginSchema = {
    summary: 'Login Admin',
    description: 'Login akun untuk mendapatkan token dan data akun lainnya. Lalu memasang cookie.',
    tags: ['Admin / Auth'],
    body: type_provider_typebox_1.Type.Object({
        username: type_provider_typebox_1.Type.String(),
        password: type_provider_typebox_1.Type.String({ minLength: 6 }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            token: type_provider_typebox_1.Type.String(),
            meta: type_provider_typebox_1.Type.Object({
                profile: type_provider_typebox_1.Type.Object({
                    name: type_provider_typebox_1.Type.String(),
                    username: type_provider_typebox_1.Type.String(),
                    email: type_provider_typebox_1.Type.String({ format: 'email' }),
                    mobile: type_provider_typebox_1.Type.String(),
                    profileUrl: type_provider_typebox_1.Type.Union([
                        type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                        type_provider_typebox_1.Type.Null(),
                    ]),
                }),
                outlet: type_provider_typebox_1.Type.Object({
                    name: type_provider_typebox_1.Type.String(),
                    address: type_provider_typebox_1.Type.String(),
                    province: type_provider_typebox_1.Type.String(),
                    regency: type_provider_typebox_1.Type.String(),
                    district: type_provider_typebox_1.Type.String(),
                    village: type_provider_typebox_1.Type.String(),
                    center: type_provider_typebox_1.Type.Boolean(),
                    profileUrl: type_provider_typebox_1.Type.Union([
                        type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                        type_provider_typebox_1.Type.Null(),
                    ]),
                }),
                ecommerce: type_provider_typebox_1.Type.Object({
                    transaction: type_provider_typebox_1.Type.Object({
                        incomingOrderCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
                        shippedOrderCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
                        completeOrderCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
                        canceledOrderCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
                    }),
                }),
            }),
        }),
    },
};
exports.LogoutSchema = {
    summary: 'Logout Admin',
    description: 'Logout untuk menghapus cookie.',
    tags: ['Admin / Auth'],
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.RefreshTokenSchema = {
    summary: 'Refresh Token',
    description: 'Untuk mendapatkan refresh token dan disimpan di cookie.',
    tags: ['Admin / Auth'],
    response: {
        200: type_provider_typebox_1.Type.Union([
            type_provider_typebox_1.Type.Object({
                code: type_provider_typebox_1.Type.Union([
                    type_provider_typebox_1.Type.Literal('ERR_NOT_AUTHENTICATED'),
                    type_provider_typebox_1.Type.Literal('ERR_INVALID_TOKEN'),
                    type_provider_typebox_1.Type.Literal('ERR_ADMIN_NOT_EXISTS'),
                ]),
            }),
            type_provider_typebox_1.Type.Object({
                token: type_provider_typebox_1.Type.String(),
                meta: type_provider_typebox_1.Type.Object({
                    profile: type_provider_typebox_1.Type.Object({
                        name: type_provider_typebox_1.Type.String(),
                        username: type_provider_typebox_1.Type.String(),
                        email: type_provider_typebox_1.Type.String({ format: 'email' }),
                        mobile: type_provider_typebox_1.Type.String(),
                        profileUrl: type_provider_typebox_1.Type.Union([
                            type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                            type_provider_typebox_1.Type.Null(),
                        ]),
                    }),
                    outlet: type_provider_typebox_1.Type.Object({
                        name: type_provider_typebox_1.Type.String(),
                        address: type_provider_typebox_1.Type.String(),
                        province: type_provider_typebox_1.Type.String(),
                        regency: type_provider_typebox_1.Type.String(),
                        district: type_provider_typebox_1.Type.String(),
                        village: type_provider_typebox_1.Type.String(),
                        center: type_provider_typebox_1.Type.Boolean(),
                        profileUrl: type_provider_typebox_1.Type.Union([
                            type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
                            type_provider_typebox_1.Type.Null(),
                        ]),
                    }),
                    ecommerce: type_provider_typebox_1.Type.Object({
                        transaction: type_provider_typebox_1.Type.Object({
                            incomingOrderCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
                            shippedOrderCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
                            completeOrderCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
                            canceledOrderCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
                        }),
                    }),
                }),
            }),
        ]),
    },
};
exports.ForgotPasswordSchema = {
    summary: 'Mengirim Email Lupa Password',
    description: 'Untuk merequest lupa password dan dikirimkan lewat email.',
    tags: ['Admin / Auth'],
    body: type_provider_typebox_1.Type.Object({ email: type_provider_typebox_1.Type.String({ format: 'email' }) }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.ResetPasswordSchema = {
    summary: 'Reset Password',
    description: 'Untuk mereset password setelah mendapatkan link dari email.',
    tags: ['Admin / Auth'],
    params: type_provider_typebox_1.Type.Object({
        adminId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        token64: type_provider_typebox_1.Type.String(),
    }),
    body: type_provider_typebox_1.Type.Object({
        newPassword: type_provider_typebox_1.Type.String({ minLength: 6 }),
        confirmPassword: type_provider_typebox_1.Type.String(),
    }),
    response: { 204: type_provider_typebox_1.Type.Undefined() },
};
