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
exports.DeleteAccountHandler = exports.UpdatePasswordHandler = exports.UpdateDisplayPictureHandler = exports.UpdateProfileHandler = exports.GetProfileHandler = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const operator_1 = __importDefault(require("../../../lib/operator"));
const profile_services_1 = require("./profile.services");
const env_1 = require("../../../env");
const GetProfileHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.userId;
    const profile = yield (0, profile_services_1.getProfile)(reply, userId);
    if (!profile)
        return reply.badRequest('Profile does not exists');
    return reply.send(profile);
});
exports.GetProfileHandler = GetProfileHandler;
const UpdateProfileHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, mobile } = request.body;
    const userId = request.userId;
    const isMobileValid = (0, operator_1.default)().test(mobile);
    if (!isMobileValid)
        return reply.badRequest('body/mobile must match format "mobile"');
    const profile = yield (0, profile_services_1.getProfile)(reply, userId);
    if (!profile)
        return reply.badRequest('Profile does not exists');
    const existingEmail = yield (0, profile_services_1.getUserByEmail)(reply, email);
    if (existingEmail && existingEmail.id !== userId)
        return reply.badRequest('Email already exists');
    const existingMobile = yield (0, profile_services_1.getUserByMobile)(reply, mobile);
    if (existingMobile && existingMobile.id !== userId)
        return reply.badRequest('Mobile already exists');
    yield (0, profile_services_1.updateProfile)(reply, userId, { name, email, mobile });
    return reply.code(204).send(undefined);
});
exports.UpdateProfileHandler = UpdateProfileHandler;
const UpdateDisplayPictureHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.UpdateDisplayPictureHandler = UpdateDisplayPictureHandler;
const UpdatePasswordHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword, confirmPassword } = request.body;
    const userId = request.userId;
    if (newPassword !== confirmPassword)
        return reply.badRequest('Password confirmation does not match');
    const existingUser = yield (0, profile_services_1.getUserById)(reply, userId);
    if (!existingUser)
        return reply.badRequest('User does not exists');
    const isPasswordCorrect = yield bcryptjs_1.default.compare(oldPassword, existingUser.passwordHash);
    if (!isPasswordCorrect)
        return reply.badRequest('Password is not correct');
    if (oldPassword === newPassword)
        return reply.badRequest('New password cannot be the same as the previous password');
    const passwordHash = yield bcryptjs_1.default.hash(newPassword, 12);
    yield (0, profile_services_1.updateUserPassword)(reply, userId, passwordHash);
    return reply.code(204).send(undefined);
});
exports.UpdatePasswordHandler = UpdatePasswordHandler;
const DeleteAccountHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { token64 } = request.params;
    const token = Buffer.from(token64, 'base64').toString();
    try {
        const payload = jsonwebtoken_1.default.verify(token, env_1.ACCOUNT_DELETION_TOKEN_SECRET);
        const user = yield (0, profile_services_1.getUserById)(reply, payload.id);
        if (!user)
            return reply.badRequest('User does not exists');
        yield (0, profile_services_1.updateUserStatus)(reply, user.id, 'under_deletion');
        return reply.code(204).send(undefined);
    }
    catch (error) {
        if (error instanceof Error)
            return reply.badRequest(error.message);
        return reply.badRequest('Not verified');
    }
});
exports.DeleteAccountHandler = DeleteAccountHandler;
