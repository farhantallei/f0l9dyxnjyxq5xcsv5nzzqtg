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
exports.AuthenticationHandler = exports.VerificationHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../env");
const client_services_1 = require("./client.services");
const VerificationHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = request.headers.authorization;
    if (authHeader == null)
        return reply.unauthorized('Not authenticated');
    const token = authHeader.split(' ')[1];
    if (!token)
        return reply.forbidden('Token is empty');
    const payload = jsonwebtoken_1.default.decode(token);
    if (!payload)
        return reply.forbidden('jwt malformed');
    if (!payload.hasOwnProperty('id') ||
        !payload.hasOwnProperty('sessionId') ||
        !payload.hasOwnProperty('email'))
        return reply.forbidden('jwt malformed');
    const userSession = yield (0, client_services_1.getUserSessionById)(reply, payload.sessionId);
    if (!userSession)
        return reply.forbidden('User session not found');
    jsonwebtoken_1.default.verify(token, env_1.CLIENT_ACCESS_TOKEN_SECRET + userSession.secret, (error, decoded) => {
        if (error) {
            return reply.forbidden(error.message);
        }
        if (typeof decoded === 'string' || decoded == null) {
            return reply.forbidden('Token is invalid');
        }
    });
    const existingUser = yield (0, client_services_1.getUserByEmail)(reply, payload.email);
    if (!existingUser)
        return reply.forbidden('Invalid credentials');
    if (existingUser.status === 'non_active')
        return reply.forbidden('Account is not activated yet');
    if (existingUser.status === 'under_deletion')
        return reply.forbidden('Account is under deletion');
    yield (0, client_services_1.updateLastLoggedIn)(reply, payload.sessionId);
    request.userId = payload.id;
});
exports.VerificationHandler = VerificationHandler;
const AuthenticationHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = request.headers.authorization;
    if (authHeader == null)
        return reply.unauthorized('Not authenticated');
    const token = authHeader.split(' ')[1];
    if (!token)
        return reply.forbidden('Token is empty');
    const payload = jsonwebtoken_1.default.decode(token);
    if (!payload)
        return reply.forbidden('jwt malformed');
    if (!payload.hasOwnProperty('id') ||
        !payload.hasOwnProperty('sessionId') ||
        !payload.hasOwnProperty('email'))
        return reply.forbidden('jwt malformed');
    const userSession = yield (0, client_services_1.getUserSessionById)(reply, payload.sessionId);
    if (!userSession)
        return reply.forbidden('User session not found');
    jsonwebtoken_1.default.verify(token, env_1.CLIENT_ACCESS_TOKEN_SECRET + userSession.secret, (error, decoded) => {
        if (error) {
            return reply.forbidden(error.message);
        }
        if (typeof decoded === 'string' || decoded == null) {
            return reply.forbidden('Token is invalid');
        }
    });
    const existingUser = yield (0, client_services_1.getUserByEmail)(reply, payload.email);
    if (!existingUser)
        return reply.forbidden('Invalid credentials');
    if (existingUser.status === 'non_active')
        return reply.forbidden('Account is not activated yet');
    if (existingUser.status === 'under_deletion')
        return reply.forbidden('Account is under deletion');
    yield (0, client_services_1.updateLastActivity)(reply, payload.sessionId);
    request.userId = payload.id;
    request.sessionId = payload.sessionId;
});
exports.AuthenticationHandler = AuthenticationHandler;
