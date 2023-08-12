"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutSchema = exports.VerifySchema = exports.AccountActivationSchema = exports.DeleteAccountSchema = exports.ForgotPasswordSchema = exports.ResetPasswordSchema = exports.LoginMediaSocialSchema = exports.LoginSchema = exports.ResendActivationSchema = exports.RegisterMediaSocialSchema = exports.RegisterSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.RegisterSchema = {
    summary: 'Daftar Akun',
    description: 'Untuk daftar akun',
    tags: ['Client / Auth'],
    body: type_provider_typebox_1.Type.Object({
        name: type_provider_typebox_1.Type.String(),
        email: type_provider_typebox_1.Type.String({ format: 'email' }),
        mobile: type_provider_typebox_1.Type.String(),
        password: type_provider_typebox_1.Type.String({ minLength: 6 }),
        confirmPassword: type_provider_typebox_1.Type.String(),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            statusCode: type_provider_typebox_1.Type.Literal(200),
            message: type_provider_typebox_1.Type.Literal('Success'),
            token: type_provider_typebox_1.Type.String(),
        }),
        400: type_provider_typebox_1.Type.Object({
            statusCode: type_provider_typebox_1.Type.Literal(400),
            error: type_provider_typebox_1.Type.Literal('Bad Request'),
            message: type_provider_typebox_1.Type.String(),
            code: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.Literal('FST_ERR_VALIDATION'),
                type_provider_typebox_1.Type.Literal('ERR_INVALID_MOBILE'),
                type_provider_typebox_1.Type.Literal('ERR_MOBILE_EXISTS'),
                type_provider_typebox_1.Type.Literal('ERR_EMAIL_EXISTS'),
                type_provider_typebox_1.Type.Literal('ERR_PASSWORD_NOT_MATCH'),
            ])),
        }),
    },
};
exports.RegisterMediaSocialSchema = {
    summary: 'Register 3rd Party',
    description: 'Untuk menambahkan data saat pertama kali login dengan Media Social.',
    tags: ['Client / Auth'],
    headers: type_provider_typebox_1.Type.Object({
        'x-coordinates': type_provider_typebox_1.Type.RegEx(/^(?:-?\d+(?:\.\d+)?),(?:-?\d+(?:\.\d+)?)$/),
    }),
    body: type_provider_typebox_1.Type.Object({
        name: type_provider_typebox_1.Type.String(),
        email: type_provider_typebox_1.Type.String({ format: 'email' }),
        mobile: type_provider_typebox_1.Type.String(),
        password: type_provider_typebox_1.Type.String({ minLength: 6 }),
        confirmPassword: type_provider_typebox_1.Type.String(),
        profileUrl: type_provider_typebox_1.Type.String({ format: 'uri-reference' }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            name: type_provider_typebox_1.Type.String(),
            token: type_provider_typebox_1.Type.String(),
            meta: type_provider_typebox_1.Type.Object({
                cartCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
                unreadNotificationCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
            }),
        }),
    },
};
exports.ResendActivationSchema = {
    summary: 'Mengirim Email Aktivasi Akun',
    description: 'Untuk mengirim aktivasi email setelah register. (hanya untuk resend aktivasi apabila tidak muncul email aktivasi setelah register)',
    tags: ['Client / Auth'],
    body: type_provider_typebox_1.Type.Object({
        email: type_provider_typebox_1.Type.String({ format: 'email' }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            statusCode: type_provider_typebox_1.Type.Literal(200),
            message: type_provider_typebox_1.Type.Literal('Success'),
            token: type_provider_typebox_1.Type.String(),
        }),
    },
};
exports.LoginSchema = {
    summary: 'Login',
    description: 'Login akun untuk mendapatkan token dan data akun lainnya.',
    tags: ['Client / Auth'],
    headers: type_provider_typebox_1.Type.Object({
        'x-coordinates': type_provider_typebox_1.Type.RegEx(/^(?:-?\d+(?:\.\d+)?),(?:-?\d+(?:\.\d+)?)$/),
    }),
    body: type_provider_typebox_1.Type.Object({
        email: type_provider_typebox_1.Type.String({ format: 'email' }),
        password: type_provider_typebox_1.Type.String({ minLength: 6 }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
            token: type_provider_typebox_1.Type.String(),
            meta: type_provider_typebox_1.Type.Object({
                cartCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
                unreadNotificationCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
            }),
        }),
        400: type_provider_typebox_1.Type.Object({
            statusCode: type_provider_typebox_1.Type.Literal(400),
            error: type_provider_typebox_1.Type.Literal('Bad Request'),
            message: type_provider_typebox_1.Type.String(),
            code: type_provider_typebox_1.Type.Union([
                type_provider_typebox_1.Type.Literal('FST_ERR_VALIDATION'),
                type_provider_typebox_1.Type.Literal('ERR_INVALID_CREDENTIALS'),
                type_provider_typebox_1.Type.Literal('ERR_NOT_ACTIVATED'),
            ]),
        }),
    },
};
exports.LoginMediaSocialSchema = {
    summary: 'Login 3rd Party',
    description: 'Login dengan Media Social (Google, Facebook).',
    tags: ['Client / Auth'],
    headers: type_provider_typebox_1.Type.Object({
        'x-coordinates': type_provider_typebox_1.Type.RegEx(/^(?:-?\d+(?:\.\d+)?),(?:-?\d+(?:\.\d+)?)$/),
    }),
    body: type_provider_typebox_1.Type.Object({
        email: type_provider_typebox_1.Type.String({ format: 'email' }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            name: type_provider_typebox_1.Type.String(),
            token: type_provider_typebox_1.Type.String(),
            meta: type_provider_typebox_1.Type.Object({
                cartCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
                unreadNotificationCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
            }),
        }),
    },
};
exports.ResetPasswordSchema = {
    summary: 'Reset Password',
    description: 'Untuk mereset password setelah mendapatkan link dari email.',
    tags: ['Client / Auth'],
    params: type_provider_typebox_1.Type.Object({
        userId: type_provider_typebox_1.Type.Integer({ minimum: 1, description: 'User ID' }),
        token64: type_provider_typebox_1.Type.String({ description: 'Token Base64' }),
    }),
    body: type_provider_typebox_1.Type.Object({
        newPassword: type_provider_typebox_1.Type.String({ minLength: 6 }),
        confirmPassword: type_provider_typebox_1.Type.String(),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            statusCode: type_provider_typebox_1.Type.Literal(200),
            message: type_provider_typebox_1.Type.Literal('Success'),
        }),
    },
};
exports.ForgotPasswordSchema = {
    summary: 'Mengirim Email Lupa Password',
    description: 'Untuk merequest lupa password dan dikirimkan lewat email.',
    tags: ['Client / Auth'],
    body: type_provider_typebox_1.Type.Object({ email: type_provider_typebox_1.Type.String({ format: 'email' }) }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            userId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            token: type_provider_typebox_1.Type.String(),
        }),
    },
};
exports.DeleteAccountSchema = {
    summary: 'Mengirim Email Hapus Akun',
    description: 'Untuk merequest hapus akun dan dikirimkan lewat email.',
    tags: ['Mail'],
    response: {
        200: type_provider_typebox_1.Type.Object({
            statusCode: type_provider_typebox_1.Type.Literal(200),
            message: type_provider_typebox_1.Type.Literal('Success'),
            token: type_provider_typebox_1.Type.String(),
        }),
    },
};
exports.AccountActivationSchema = {
    summary: 'Aktivasi Akun',
    description: 'Untuk mengaktivasi akun setelah register.',
    tags: ['Client / Auth'],
    headers: type_provider_typebox_1.Type.Object({
        'x-coordinates': type_provider_typebox_1.Type.RegEx(/^(?:-?\d+(?:\.\d+)?),(?:-?\d+(?:\.\d+)?)$/),
    }),
    params: type_provider_typebox_1.Type.Object({
        token64: type_provider_typebox_1.Type.String(),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            name: type_provider_typebox_1.Type.String(),
            token: type_provider_typebox_1.Type.String(),
            meta: type_provider_typebox_1.Type.Object({
                cartCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
                unreadNotificationCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
            }),
        }),
    },
};
exports.VerifySchema = {
    summary: 'Verifikasi User',
    description: 'Untuk verifikasi user saat membuka aplikasi.',
    tags: ['Client / Auth'],
    response: {
        200: type_provider_typebox_1.Type.Object({
            statusCode: type_provider_typebox_1.Type.Literal(200),
            message: type_provider_typebox_1.Type.Literal('Success'),
            meta: type_provider_typebox_1.Type.Object({
                cartCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
                unreadNotificationCount: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
            }),
        }),
    },
};
exports.LogoutSchema = {
    summary: 'Logout',
    description: 'Logout untuk menghapus session.',
    tags: ['Client / Auth'],
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
