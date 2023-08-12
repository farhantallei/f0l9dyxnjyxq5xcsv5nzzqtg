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
const auth_services_1 = require("./auth.services");
const utils_1 = __importDefault(require("../../../utils"));
const mail_1 = require("../../../mail");
const LoginHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    const existingAgronom = yield (0, auth_services_1.getAgronomByEmail)(reply, email);
    if (!existingAgronom)
        return reply.badRequest('Agronom does not exist');
    const isPasswordCorrect = yield bcryptjs_1.default.compare(password, existingAgronom.passwordHash);
    if (!isPasswordCorrect)
        return reply.badRequest('Invalid credentials');
    const refreshToken = jsonwebtoken_1.default.sign({ id: existingAgronom.id }, env_1.AGRONOM_REFRESH_TOKEN_SECRET);
    reply.setCookie('jwt_token', refreshToken, {
        signed: true,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    const accessToken = jsonwebtoken_1.default.sign({ id: existingAgronom.id, email: existingAgronom.email }, env_1.AGRONOM_ACCESS_TOKEN_SECRET);
    return reply.send({
        id: existingAgronom.id,
        name: existingAgronom.name,
        specialist: existingAgronom.specialist.specialist,
        university: existingAgronom.university,
        profileUrl: existingAgronom.profileUrl,
        token: accessToken,
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
        return reply.unauthorized('Not authenticated');
    const { value: refreshToken } = reply.unsignCookie(signedRefreshToken);
    if (!refreshToken)
        return reply.forbidden('Token is invalid');
    const payload = jsonwebtoken_1.default.verify(refreshToken, env_1.AGRONOM_REFRESH_TOKEN_SECRET);
    const existingAgronom = yield (0, auth_services_1.getAgronomById)(reply, payload.id);
    if (!existingAgronom)
        return reply.forbidden('Agronom does not exists');
    const newRefreshToken = jsonwebtoken_1.default.sign({ id: existingAgronom.id }, env_1.AGRONOM_REFRESH_TOKEN_SECRET);
    reply.setCookie('jwt_token', newRefreshToken, {
        signed: true,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    const newAccessToken = jsonwebtoken_1.default.sign({ id: existingAgronom.id, email: existingAgronom.email }, env_1.AGRONOM_ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    });
    return {
        id: existingAgronom.id,
        name: existingAgronom.name,
        specialist: existingAgronom.specialist.specialist,
        university: existingAgronom.university,
        profileUrl: existingAgronom.profileUrl,
        token: newAccessToken,
    };
});
exports.RefreshTokenHandler = RefreshTokenHandler;
const ForgotPasswordHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = request.body;
    const agronom = yield (0, auth_services_1.getAgronomByEmail)(reply, email);
    if (!agronom)
        return reply.badRequest('Agronom does not exists');
    const secret = env_1.AGRONOM_ACCESS_TOKEN_SECRET + agronom.passwordHash;
    const token = jsonwebtoken_1.default.sign({ id: agronom.id, email: agronom.email }, secret, {
        expiresIn: '5m',
    });
    const token64 = Buffer.from(token).toString('base64');
    console.log(`forgot: ${token64}`);
    const link = `http://127.0.0.1:5173/reset-password/${agronom.id}/${token64}`;
    utils_1.default.html(reply, {
        to: email,
        subject: 'Password Reset',
        html: (0, mail_1.agronomForgotPasswordMail)(agronom.name, link),
    });
    return reply.send(undefined);
});
exports.ForgotPasswordHandler = ForgotPasswordHandler;
const ResetPasswordHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token64 } = request.params;
    const { newPassword, confirmPassword } = request.body;
    const agronom = yield (0, auth_services_1.getAgronomById)(reply, id);
    if (!agronom)
        return reply.badRequest('Admin does not exists');
    const token = Buffer.from(token64, 'base64').toString();
    const secret = env_1.AGRONOM_ACCESS_TOKEN_SECRET + agronom.passwordHash;
    try {
        const payload = jsonwebtoken_1.default.verify(token, secret);
        if (payload.id !== id)
            return reply.badRequest('Invalid token');
        if (newPassword !== confirmPassword)
            return reply.badRequest('Password confirmation does not match');
        const isPasswordSame = yield bcryptjs_1.default.compare(newPassword, agronom.passwordHash);
        if (isPasswordSame)
            return reply.badRequest('Password cannot be the same as the previous password');
        const passwordHash = yield bcryptjs_1.default.hash(newPassword, 12);
        yield (0, auth_services_1.updateAgronomPassword)(reply, id, passwordHash);
        return reply.send(undefined);
    }
    catch (error) {
        if (error instanceof Error)
            return reply.badRequest(error.message);
        return reply.badRequest('Not verified');
    }
});
exports.ResetPasswordHandler = ResetPasswordHandler;
