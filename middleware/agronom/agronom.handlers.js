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
exports.AuthenticationHandler = exports.agronomIoAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../env");
const agronom_services_1 = require("./agronom.services");
const prisma_1 = __importDefault(require("../../lib/prisma"));
const agronomIoAuthentication = (socket, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (socket.handshake.auth.token) {
        const token = socket.handshake.auth.token;
        let payload;
        try {
            payload = jsonwebtoken_1.default.decode(token);
        }
        catch (error) {
            next(new Error('jwt malformed'));
            return;
        }
        if (!payload.hasOwnProperty('id') ||
            !payload.hasOwnProperty('email'))
            next(new Error('jwt malformed'));
        jsonwebtoken_1.default.verify(token, env_1.AGRONOM_ACCESS_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                next(new Error(error.message));
            }
            if (typeof decoded === 'string' || decoded == null) {
                next(new Error('Token is invalid'));
            }
        });
        const existingAgronom = yield getAgronom();
        if (!existingAgronom) {
            next(new Error('Invalid credentials'));
            return;
        }
        socket.agronomId = existingAgronom.id;
        next();
        function getAgronom() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return prisma_1.default.agronom.findUnique({ where: { email: payload.email } });
                }
                catch (error) {
                    if (error instanceof Error) {
                        next(error);
                        return null;
                    }
                    else {
                        next(new Error('Internal server error'));
                        return null;
                    }
                }
            });
        }
    }
    else {
        next(new Error('Please send token'));
    }
});
exports.agronomIoAuthentication = agronomIoAuthentication;
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
        !payload.hasOwnProperty('email'))
        return reply.forbidden('jwt malformed');
    jsonwebtoken_1.default.verify(token, env_1.AGRONOM_ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
            return reply.forbidden(error.message);
        }
        if (typeof decoded === 'string' || decoded == null) {
            return reply.forbidden('Token is invalid');
        }
    });
    const existingAgronom = yield (0, agronom_services_1.getAgronomByEmail)(reply, payload.email);
    if (!existingAgronom)
        return reply.forbidden('Invalid credentials');
    request.agronomId = payload.id;
});
exports.AuthenticationHandler = AuthenticationHandler;
