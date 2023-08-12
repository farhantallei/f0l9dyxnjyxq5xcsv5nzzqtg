"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordSchema = exports.ForgotPasswordSchema = exports.RefreshTokenSchema = exports.LogoutSchema = exports.LoginSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.LoginSchema = {
    summary: 'Login Agronom',
    description: 'Login akun untuk mendapatkan token dan data akun lainnya. Lalu memasang cookie.',
    tags: ['Agronom / Auth'],
    body: type_provider_typebox_1.Type.Object({
        email: type_provider_typebox_1.Type.String({ format: 'email' }),
        password: type_provider_typebox_1.Type.String({ minLength: 6 }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
            specialist: type_provider_typebox_1.Type.String(),
            university: type_provider_typebox_1.Type.String(),
            profileUrl: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.String(), type_provider_typebox_1.Type.Null()]),
            token: type_provider_typebox_1.Type.String(),
        }),
    },
};
exports.LogoutSchema = {
    summary: 'Logout Agronom',
    description: 'Logout untuk menghapus cookie.',
    tags: ['Agronom / Auth'],
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.RefreshTokenSchema = {
    summary: 'Refresh Token',
    description: 'Untuk mendapatkan refresh token dan disimpan di cookie.',
    tags: ['Agronom / Auth'],
    response: {
        200: type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
            specialist: type_provider_typebox_1.Type.String(),
            university: type_provider_typebox_1.Type.String(),
            profileUrl: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.String(), type_provider_typebox_1.Type.Null()]),
            token: type_provider_typebox_1.Type.String(),
        }),
    },
};
exports.ForgotPasswordSchema = {
    summary: 'Mengirim Email Lupa Password',
    description: 'Untuk merequest lupa password dan dikirimkan lewat email.',
    tags: ['Agronom / Auth'],
    body: type_provider_typebox_1.Type.Object({ email: type_provider_typebox_1.Type.String({ format: 'email' }) }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.ResetPasswordSchema = {
    summary: 'Reset Password',
    description: 'Untuk mereset password setelah mendapatkan link dari email.',
    tags: ['Agronom / Auth'],
    params: type_provider_typebox_1.Type.Object({
        id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        token64: type_provider_typebox_1.Type.String(),
    }),
    body: type_provider_typebox_1.Type.Object({
        newPassword: type_provider_typebox_1.Type.String({ minLength: 6 }),
        confirmPassword: type_provider_typebox_1.Type.String(),
    }),
    response: { 204: type_provider_typebox_1.Type.Undefined() },
};
