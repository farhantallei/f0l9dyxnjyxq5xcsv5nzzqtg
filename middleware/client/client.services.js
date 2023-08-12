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
exports.updateLastActivity = exports.updateLastLoggedIn = exports.getUserByEmail = exports.getUserSessionById = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const utils_1 = require("../../utils");
function getUserSessionById(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userSession.findUnique({ where: { id } }), reply);
    });
}
exports.getUserSessionById = getUserSessionById;
function getUserByEmail(reply, email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.user.findUnique({ where: { email } }), reply);
    });
}
exports.getUserByEmail = getUserByEmail;
function updateLastLoggedIn(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userSession.update({
            where: { id },
            data: { lastLoggedIn: new Date() },
        }), reply);
    });
}
exports.updateLastLoggedIn = updateLastLoggedIn;
function updateLastActivity(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userSession.update({
            where: { id },
            data: { lastActivity: new Date() },
        }), reply);
    });
}
exports.updateLastActivity = updateLastActivity;
