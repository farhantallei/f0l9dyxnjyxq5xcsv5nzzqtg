"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordHandler = exports.ForgotPasswordHandler = exports.RefreshTokenHandler = exports.LogoutHandler = exports.LoginHandler = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../../env");
const validation_1 = require("../../../utils/validation");
const auth_services_1 = require("./auth.services");
const utils_1 = __importDefault(require("../../../utils"));
const mail_1 = require("../../../mail");
const LoginHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = request.body;
    const isEmail = (0, validation_1.emailValidation)(username);
    let existingAdmin = null;
    if (isEmail) {
        existingAdmin = yield (0, auth_services_1.getAdminByUsernameOrEmail)(reply, { email: username });
        if (!existingAdmin)
            return reply.badRequest('Admin with the email does not exist');
    }
    else {
        existingAdmin = yield (0, auth_services_1.getAdminByUsernameOrEmail)(reply, { username });
        if (!existingAdmin)
            return reply.badRequest('Admin with the username does not exist');
    }
    const isPasswordCorrect = yield bcryptjs_1.default.compare(password, existingAdmin.passwordHash);
    if (!isPasswordCorrect)
        return reply.badRequest('Invalid credentials');
    const refreshToken = jsonwebtoken_1.default.sign({ id: existingAdmin.id }, env_1.ADMIN_REFRESH_TOKEN_SECRET);
    reply.setCookie('jwt_token', refreshToken, {
        signed: true,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    const accessToken = jsonwebtoken_1.default.sign({ id: existingAdmin.id, email: existingAdmin.email }, env_1.ADMIN_ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const incomingOrderCount = yield (0, auth_services_1.countIncomingOrders)(reply, existingAdmin.outletId);
    const shippedOrderCount = yield (0, auth_services_1.countShippedOrders)(reply, existingAdmin.outletId);
    const completeOrderCount = yield (0, auth_services_1.countCompleteOrders)(reply, existingAdmin.outletId);
    const canceledOrderCount = yield (0, auth_services_1.countCancelledOrders)(reply, existingAdmin.outletId);
    return reply.send({
        token: accessToken,
        meta: {
            profile: {
                name: existingAdmin.name,
                username: existingAdmin.username,
                email: existingAdmin.email,
                mobile: existingAdmin.mobile,
                profileUrl: existingAdmin.profileUrl,
            },
            outlet: existingAdmin.outlet,
            ecommerce: {
                transaction: {
                    incomingOrderCount,
                    shippedOrderCount,
                    completeOrderCount,
                    canceledOrderCount,
                },
            },
        },
    });
});
exports.LoginHandler = LoginHandler;
const LogoutHandler = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    reply.setCookie('jwt_token', '', {
        signed: true,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    return reply.send(undefined);
});
exports.LogoutHandler = LogoutHandler;
const RefreshTokenHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const signedRefreshToken = request.cookies.jwt_token;
    if (!signedRefreshToken)
        return reply.send({ code: 'ERR_NOT_AUTHENTICATED' });
    const { value: refreshToken } = reply.unsignCookie(signedRefreshToken);
    if (!refreshToken)
        return reply.send({ code: 'ERR_INVALID_TOKEN' });
    const payload = jsonwebtoken_1.default.verify(refreshToken, env_1.ADMIN_REFRESH_TOKEN_SECRET);
    const existingAdmin = yield (0, auth_services_1.getAdminById)(reply, payload.id);
    if (!existingAdmin)
        return reply.send({ code: 'ERR_ADMIN_NOT_EXISTS' });
    const newRefreshToken = jsonwebtoken_1.default.sign({ id: existingAdmin.id }, env_1.ADMIN_REFRESH_TOKEN_SECRET);
    reply.setCookie('jwt_token', newRefreshToken, {
        signed: true,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    const newAccessToken = jsonwebtoken_1.default.sign({ id: existingAdmin.id, email: existingAdmin.email }, env_1.ADMIN_ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    });
    const incomingOrderCount = yield (0, auth_services_1.countIncomingOrders)(reply, existingAdmin.outletId);
    const shippedOrderCount = yield (0, auth_services_1.countShippedOrders)(reply, existingAdmin.outletId);
    const completeOrderCount = yield (0, auth_services_1.countCompleteOrders)(reply, existingAdmin.outletId);
    const canceledOrderCount = yield (0, auth_services_1.countCancelledOrders)(reply, existingAdmin.outletId);
    return reply.send({
        token: newAccessToken,
        meta: {
            profile: {
                name: existingAdmin.name,
                username: existingAdmin.username,
                email: existingAdmin.email,
                mobile: existingAdmin.mobile,
                profileUrl: existingAdmin.profileUrl,
            },
            outlet: existingAdmin.outlet,
            ecommerce: {
                transaction: {
                    incomingOrderCount,
                    shippedOrderCount,
                    completeOrderCount,
                    canceledOrderCount,
                },
            },
        },
    });
});
exports.RefreshTokenHandler = RefreshTokenHandler;
const ForgotPasswordHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = request.body;
    const admin = yield (0, auth_services_1.getAdminByEmail)(reply, email);
    if (!admin)
        return reply.badRequest('Admin does not exists');
    const secret = env_1.ADMIN_ACCESS_TOKEN_SECRET + admin.passwordHash;
    const token = jsonwebtoken_1.default.sign({ id: admin.id, email: admin.email }, secret, {
        expiresIn: '5m',
    });
    const token64 = Buffer.from(token).toString('base64');
    console.log(`forgot: ${token64}`);
    const link = `http://127.0.0.1:5173/reset-password/${admin.id}/${token64}`;
    utils_1.default.html(reply, {
        to: email,
        subject: 'Password Reset',
        html: (0, mail_1.adminForgotPasswordMail)(admin.name, link),
    });
    return reply.send(undefined);
});
exports.ForgotPasswordHandler = ForgotPasswordHandler;
const ResetPasswordHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminId, token64 } = request.params;
    const { newPassword, confirmPassword } = request.body;
    const admin = yield (0, auth_services_1.getAdminById)(reply, adminId);
    if (!admin)
        return reply.badRequest('Admin does not exists');
    const token = Buffer.from(token64, 'base64').toString();
    const secret = env_1.ADMIN_ACCESS_TOKEN_SECRET + admin.passwordHash;
    try {
        const payload = jsonwebtoken_1.default.verify(token, secret);
        if (payload.id !== adminId)
            return reply.badRequest('Invalid token');
        if (newPassword !== confirmPassword)
            return reply.badRequest('Password confirmation does not match');
        const isPasswordSame = yield bcryptjs_1.default.compare(newPassword, admin.passwordHash);
        if (isPasswordSame)
            return reply.badRequest('Password cannot be the same as the previous password');
        const passwordHash = yield bcryptjs_1.default.hash(newPassword, 12);
        yield (0, auth_services_1.updateAdminPassword)(reply, adminId, passwordHash);
        return reply.send(undefined);
    }
    catch (error) {
        if (error instanceof Error)
            return reply.badRequest(error.message);
        return reply.badRequest('Not verified');
    }
});
exports.ResetPasswordHandler = ResetPasswordHandler;
