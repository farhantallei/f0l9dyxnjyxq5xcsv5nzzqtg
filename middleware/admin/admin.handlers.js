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
exports.AuthenticationHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../env");
const admin_services_1 = require("./admin.services");
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
    jsonwebtoken_1.default.verify(token, env_1.ADMIN_ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
            return reply.forbidden(error.message);
        }
        if (typeof decoded === 'string' || decoded == null) {
            return reply.forbidden('Token is invalid');
        }
    });
    const existingAdmin = yield (0, admin_services_1.getAdminByEmail)(reply, payload.email);
    if (!existingAdmin)
        return reply.forbidden('Invalid credentials');
    request.userId = payload.id;
    request.outletId = existingAdmin.outletId;
});
exports.AuthenticationHandler = AuthenticationHandler;
