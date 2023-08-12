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
exports.updateUserStatus = exports.updateUserPassword = exports.getUserByMobile = exports.getUserByEmail = exports.getUserById = exports.updateProfile = exports.getProfile = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const utils_1 = require("../../../utils");
function getProfile(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.user.findUnique({
            where: { id: userId },
            select: { name: true, email: true, mobile: true, profileUrl: true },
        }), reply);
    });
}
exports.getProfile = getProfile;
function updateProfile(reply, userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.user.update({ where: { id: userId }, data }), reply);
    });
}
exports.updateProfile = updateProfile;
function getUserById(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.user.findUnique({ where: { id } }), reply);
    });
}
exports.getUserById = getUserById;
function getUserByEmail(reply, email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.user.findUnique({ where: { email } }), reply);
    });
}
exports.getUserByEmail = getUserByEmail;
function getUserByMobile(reply, mobile) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.user.findUnique({ where: { mobile } }), reply);
    });
}
exports.getUserByMobile = getUserByMobile;
function updateUserPassword(reply, id, passwordHash) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.user.update({ where: { id }, data: { passwordHash } }), reply);
    });
}
exports.updateUserPassword = updateUserPassword;
function updateUserStatus(reply, id, status) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.user.update({ where: { id }, data: { status } }), reply);
    });
}
exports.updateUserStatus = updateUserStatus;
