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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutHandler = exports.VerifyHandler = exports.AccountActivationHandler = exports.DeleteAccountHandler = exports.ForgotPasswordHandler = exports.ResetPasswordHandler = exports.LoginMediaSocialHandler = exports.LoginHandler = exports.ResendActivationHandler = exports.RegisterMediaSocialHandler = exports.RegisterHandler = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../../env");
const operator_1 = __importDefault(require("../../../lib/operator"));
const mail_1 = require("../../../mail");
const utils_1 = __importDefault(require("../../../utils"));
const auth_services_1 = require("./auth.services");
const RegisterHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, mobile, password, confirmPassword } = request.body;
    const isMobileValid = (0, operator_1.default)().test(mobile);
    if (!isMobileValid)
        return reply.code(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: 'body/mobile must match format "mobile"',
            code: 'ERR_INVALID_MOBILE',
        });
    const existingEmail = yield (0, auth_services_1.getUserByEmail)(reply, email);
    if (existingEmail) {
        if (existingEmail.status === 'non_active') {
            if (existingEmail.mobile !== mobile) {
                const existingMobile = yield (0, auth_services_1.getUserByMobile)(reply, mobile);
                if (existingMobile)
                    return reply.code(400).send({
                        statusCode: 400,
                        error: 'Bad Request',
                        message: 'Mobile already exists',
                        code: 'ERR_MOBILE_EXISTS',
                    });
            }
            if (password !== confirmPassword)
                return reply.code(400).send({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'Password confirmation does not match',
                    code: 'ERR_PASSWORD_NOT_MATCH',
                });
            const passwordHash = yield bcryptjs_1.default.hash(password, 12);
            const _a = yield (0, auth_services_1.updateUser)(reply, existingEmail.id, {
                name,
                mobile,
                passwordHash,
            }), { createdAt, updatedAt } = _a, user = __rest(_a, ["createdAt", "updatedAt"]);
            const accessToken = jsonwebtoken_1.default.sign({ id: user.id, email }, env_1.CLIENT_ACTIVATION_TOKEN_SECRET);
            const token64 = Buffer.from(accessToken).toString('base64');
            console.log(`activation: ${token64}`);
            const link = `ortani://verify/${token64}`;
            utils_1.default.html(reply, {
                to: email,
                subject: 'Activate Account',
                html: (0, mail_1.clientActivationMail)(user.name, link),
            });
            return reply.send({
                statusCode: 200,
                message: 'Success',
                token: token64,
            });
        }
        return reply.code(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Email already exists',
            code: 'ERR_EMAIL_EXISTS',
        });
    }
    const existingMobile = yield (0, auth_services_1.getUserByMobile)(reply, mobile);
    if (existingMobile)
        return reply.code(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Mobile already exists',
            code: 'ERR_MOBILE_EXISTS',
        });
    if (password !== confirmPassword)
        return reply.code(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Password confirmation does not match',
            code: 'ERR_PASSWORD_NOT_MATCH',
        });
    const passwordHash = yield bcryptjs_1.default.hash(password, 12);
    const _b = yield (0, auth_services_1.createUser)(reply, {
        name,
        email,
        mobile,
        passwordHash,
    }), { createdAt, updatedAt } = _b, newUser = __rest(_b, ["createdAt", "updatedAt"]);
    const accessToken = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email }, env_1.CLIENT_ACTIVATION_TOKEN_SECRET);
    const token64 = Buffer.from(accessToken).toString('base64');
    console.log(`activation: ${token64}`);
    const link = `ortani://verify/${token64}`;
    utils_1.default.html(reply, {
        to: email,
        subject: 'Activate Account',
        html: (0, mail_1.clientActivationMail)(newUser.name, link),
    });
    return reply.send({
        statusCode: 200,
        message: 'Success',
        token: token64,
    });
});
exports.RegisterHandler = RegisterHandler;
const RegisterMediaSocialHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const userAgent = request.headers['user-agent'];
    const coordinates = request.headers['x-coordinates'].split(',');
    const { name, email, mobile, password, confirmPassword, profileUrl } = request.body;
    if (!userAgent)
        return reply.badRequest("headers must have required property 'user-agent'");
    const isMobileValid = (0, operator_1.default)().test(mobile);
    if (!isMobileValid)
        return reply.badRequest('body/mobile must match format "mobile"');
    const existingEmail = yield (0, auth_services_1.getUserByEmail)(reply, email);
    if (existingEmail)
        return reply.badRequest('Email is already exists');
    const existingMobile = yield (0, auth_services_1.getUserByMobile)(reply, mobile);
    if (existingMobile)
        return reply.badRequest('Mobile already exists');
    if (password !== confirmPassword)
        return reply.badRequest('Password confirmation does not match');
    const passwordHash = yield bcryptjs_1.default.hash(password, 12);
    const _c = yield (0, auth_services_1.createUser)(reply, {
        name,
        email,
        mobile,
        passwordHash,
        profileUrl,
        active: true,
    }), { createdAt, updatedAt } = _c, newUser = __rest(_c, ["createdAt", "updatedAt"]);
    const secret = crypto_1.default.randomBytes(64).toString('hex');
    const { id: sessionId } = yield (0, auth_services_1.createUserSession)(reply, newUser.id, secret, {
        latitude: Number(coordinates[0]),
        longitude: Number(coordinates[1]),
        userAgent,
    });
    const accessToken = jsonwebtoken_1.default.sign({ id: newUser.id, sessionId, email: newUser.email }, env_1.CLIENT_ACCESS_TOKEN_SECRET + secret);
    const cartCount = yield (0, auth_services_1.countCartProducts)(reply, newUser.id);
    const purchaseNotificationCount = yield (0, auth_services_1.countPurchaseNotifications)(reply, newUser.id);
    const salesNotificationCount = yield (0, auth_services_1.countSalesNotifications)(reply, newUser.id);
    return reply.send({
        name: newUser.name,
        token: accessToken,
        meta: {
            cartCount,
            unreadNotificationCount: purchaseNotificationCount + salesNotificationCount,
        },
    });
});
exports.RegisterMediaSocialHandler = RegisterMediaSocialHandler;
const ResendActivationHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = request.body;
    const user = yield (0, auth_services_1.getUserByEmail)(reply, email);
    if (!user)
        return reply.badRequest('User does not exists');
    const accessToken = jsonwebtoken_1.default.sign({ id: user.id, email }, env_1.CLIENT_ACTIVATION_TOKEN_SECRET);
    const token64 = Buffer.from(accessToken).toString('base64');
    console.log(`resend activation: ${token64}`);
    const link = `ortani://verify/${token64}`;
    utils_1.default.html(reply, {
        to: email,
        subject: 'Activate Account',
        html: (0, mail_1.clientActivationMail)(user.name, link),
    });
    return reply.send({
        statusCode: 200,
        message: 'Success',
        token: token64,
    });
});
exports.ResendActivationHandler = ResendActivationHandler;
const LoginHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const userAgent = request.headers['user-agent'];
    const coordinates = request.headers['x-coordinates'].split(',');
    const { email, password } = request.body;
    if (!userAgent)
        return reply.badRequest("headers must have required property 'user-agent'");
    const existingUser = yield (0, auth_services_1.getUserByEmail)(reply, email);
    if (!existingUser)
        return reply.code(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Invalid credentials',
            code: 'ERR_INVALID_CREDENTIALS',
        });
    const isPasswordCorrect = yield bcryptjs_1.default.compare(password, existingUser.passwordHash);
    if (!isPasswordCorrect)
        return reply.code(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Invalid credentials',
            code: 'ERR_INVALID_CREDENTIALS',
        });
    if (existingUser.status === 'non_active')
        return reply.code(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Account is not activated yet',
            code: 'ERR_NOT_ACTIVATED',
        });
    if (existingUser.status === 'under_deletion')
        yield (0, auth_services_1.updateUserStatus)(reply, existingUser.id, 'active');
    const secret = crypto_1.default.randomBytes(64).toString('hex');
    const { id: sessionId } = yield (0, auth_services_1.createUserSession)(reply, existingUser.id, secret, {
        latitude: Number(coordinates[0]),
        longitude: Number(coordinates[1]),
        userAgent,
    });
    const accessToken = jsonwebtoken_1.default.sign({ id: existingUser.id, sessionId, email: existingUser.email }, env_1.CLIENT_ACCESS_TOKEN_SECRET + secret);
    const cartCount = yield (0, auth_services_1.countCartProducts)(reply, existingUser.id);
    const purchaseNotificationCount = yield (0, auth_services_1.countPurchaseNotifications)(reply, existingUser.id);
    const salesNotificationCount = yield (0, auth_services_1.countSalesNotifications)(reply, existingUser.id);
    return reply.send({
        id: existingUser.id,
        name: existingUser.name,
        token: accessToken,
        meta: {
            cartCount,
            unreadNotificationCount: purchaseNotificationCount + salesNotificationCount,
        },
    });
});
exports.LoginHandler = LoginHandler;
const LoginMediaSocialHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const userAgent = request.headers['user-agent'];
    const coordinates = request.headers['x-coordinates'].split(',');
    const { email } = request.body;
    if (!userAgent)
        return reply.badRequest("headers must have required property 'user-agent'");
    const existingEmail = yield (0, auth_services_1.getUserByEmail)(reply, email);
    if (!existingEmail)
        return reply.notFound('Email is not found');
    const secret = crypto_1.default.randomBytes(64).toString('hex');
    const { id: sessionId } = yield (0, auth_services_1.createUserSession)(reply, existingEmail.id, secret, {
        latitude: Number(coordinates[0]),
        longitude: Number(coordinates[1]),
        userAgent,
    });
    const accessToken = jsonwebtoken_1.default.sign({ id: existingEmail.id, sessionId, email: existingEmail.email }, env_1.CLIENT_ACCESS_TOKEN_SECRET + secret);
    const cartCount = yield (0, auth_services_1.countCartProducts)(reply, existingEmail.id);
    const purchaseNotificationCount = yield (0, auth_services_1.countPurchaseNotifications)(reply, existingEmail.id);
    const salesNotificationCount = yield (0, auth_services_1.countSalesNotifications)(reply, existingEmail.id);
    return reply.send({
        name: existingEmail.name,
        token: accessToken,
        meta: {
            cartCount,
            unreadNotificationCount: purchaseNotificationCount + salesNotificationCount,
        },
    });
});
exports.LoginMediaSocialHandler = LoginMediaSocialHandler;
const ResetPasswordHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, token64 } = request.params;
    const { newPassword, confirmPassword } = request.body;
    const user = yield (0, auth_services_1.getUserById)(reply, userId);
    if (!user)
        return reply.badRequest('Invalid id');
    const token = Buffer.from(token64, 'base64').toString();
    const secret = env_1.CLIENT_ACCESS_TOKEN_SECRET + user.passwordHash;
    try {
        const payload = jsonwebtoken_1.default.verify(token, secret);
        if (payload.id !== userId)
            return reply.badRequest('Invalid token');
        if (newPassword !== confirmPassword)
            return reply.badRequest('Password confirmation does not match');
        const isPasswordSame = yield bcryptjs_1.default.compare(newPassword, user.passwordHash);
        if (isPasswordSame)
            return reply.badRequest('Password cannot be the same as the previous password');
        const passwordHash = yield bcryptjs_1.default.hash(newPassword, 12);
        yield (0, auth_services_1.updateUserPassword)(reply, userId, passwordHash);
        return reply.code(204).send(undefined);
    }
    catch (error) {
        if (error instanceof Error)
            return reply.badRequest(error.message);
        return reply.badRequest('Not verified');
    }
});
exports.ResetPasswordHandler = ResetPasswordHandler;
const ForgotPasswordHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = request.body;
    const user = yield (0, auth_services_1.getUserByEmail)(reply, email);
    if (!user)
        return reply.badRequest('User does not exists');
    const secret = env_1.CLIENT_ACCESS_TOKEN_SECRET + user.passwordHash;
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, secret, {
        expiresIn: '5m',
    });
    const token64 = Buffer.from(token).toString('base64');
    console.log(`forgot: ${token64}`);
    const link = `ortani://reset-password/${user.id}/${token64}`;
    utils_1.default.html(reply, {
        to: email,
        subject: 'Password Reset',
        html: (0, mail_1.clientForgotPasswordMail)(user.name, link),
    });
    return reply.send({ userId: user.id, token: token64 });
});
exports.ForgotPasswordHandler = ForgotPasswordHandler;
const DeleteAccountHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.userId;
    const existingUser = yield (0, auth_services_1.getUserById)(reply, userId);
    if (!existingUser)
        return reply.badRequest('User does not exists');
    const email = existingUser.email;
    const token = jsonwebtoken_1.default.sign({ id: userId, email }, env_1.ACCOUNT_DELETION_TOKEN_SECRET, {
        expiresIn: '5m',
    });
    const token64 = Buffer.from(token).toString('base64');
    console.log(`deletion: ${token64}`);
    const link = `ortani://delete-account/${userId}/${token64}`;
    utils_1.default.html(reply, {
        to: email,
        subject: 'Account Deletion',
        html: (0, mail_1.accountDeletionMail)(existingUser.name, link),
    });
    return reply.send({ statusCode: 200, message: 'Success', token: token64 });
});
exports.DeleteAccountHandler = DeleteAccountHandler;
const AccountActivationHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const userAgent = request.headers['user-agent'];
    const coordinates = request.headers['x-coordinates'].split(',');
    const { token64 } = request.params;
    if (!userAgent)
        return reply.badRequest("headers must have required property 'user-agent'");
    const token = Buffer.from(token64, 'base64').toString();
    try {
        const payload = jsonwebtoken_1.default.verify(token, env_1.CLIENT_ACTIVATION_TOKEN_SECRET);
        const user = yield (0, auth_services_1.getUserById)(reply, payload.id);
        if (!user)
            return reply.badRequest('User does not exists');
        if (user.status === 'active')
            return reply.badRequest('User is already active');
        const secret = crypto_1.default.randomBytes(64).toString('hex');
        const { id: sessionId } = yield (0, auth_services_1.createUserSession)(reply, user.id, secret, {
            latitude: Number(coordinates[0]),
            longitude: Number(coordinates[1]),
            userAgent,
        });
        const accessToken = jsonwebtoken_1.default.sign({ id: user.id, sessionId, email: user.email }, env_1.CLIENT_ACCESS_TOKEN_SECRET + secret);
        if (user.status === 'non_active')
            yield (0, auth_services_1.activateAccount)(reply, user.id);
        const cartCount = yield (0, auth_services_1.countCartProducts)(reply, user.id);
        const purchaseNotificationCount = yield (0, auth_services_1.countPurchaseNotifications)(reply, user.id);
        const salesNotificationCount = yield (0, auth_services_1.countSalesNotifications)(reply, user.id);
        return reply.send({
            name: user.name,
            token: accessToken,
            meta: {
                cartCount,
                unreadNotificationCount: purchaseNotificationCount + salesNotificationCount,
            },
        });
    }
    catch (error) {
        if (error instanceof Error)
            return reply.badRequest(error.message);
        return reply.badRequest('Not verified');
    }
});
exports.AccountActivationHandler = AccountActivationHandler;
const VerifyHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.userId;
    const cartCount = yield (0, auth_services_1.countCartProducts)(reply, userId);
    const purchaseNotificationCount = yield (0, auth_services_1.countPurchaseNotifications)(reply, userId);
    const salesNotificationCount = yield (0, auth_services_1.countSalesNotifications)(reply, userId);
    return reply.send({
        statusCode: 200,
        message: 'Success',
        meta: {
            cartCount,
            unreadNotificationCount: purchaseNotificationCount + salesNotificationCount,
        },
    });
});
exports.VerifyHandler = VerifyHandler;
const LogoutHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = request.sessionId;
    yield (0, auth_services_1.deleteUserSessionById)(reply, sessionId);
    return reply.code(204).send(undefined);
});
exports.LogoutHandler = LogoutHandler;
