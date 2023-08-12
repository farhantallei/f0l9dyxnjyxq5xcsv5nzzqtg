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
exports.getAllAdministrators = exports.getAdministratorByUsername = exports.createAdministrator = exports.getAdministratorByMobile = exports.getAdministratorByEmail = void 0;
const prisma_1 = __importDefault(require("../../../../../lib/prisma"));
const utils_1 = require("../../../../../utils");
function getAdministratorByEmail(reply, email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.admin.findUnique({ where: { email } }), reply);
    });
}
exports.getAdministratorByEmail = getAdministratorByEmail;
function getAdministratorByMobile(reply, mobile) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.admin.findUnique({ where: { mobile } }), reply);
    });
}
exports.getAdministratorByMobile = getAdministratorByMobile;
function createAdministrator(reply, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.admin.create({ data }), reply);
    });
}
exports.createAdministrator = createAdministrator;
function getAdministratorByUsername(reply, username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.admin.findUnique({ where: { username } }), reply);
    });
}
exports.getAdministratorByUsername = getAdministratorByUsername;
function getAllAdministrators(reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.admin
            .findMany()
            .then((data) => data.map((data) => (Object.assign(Object.assign({}, data), { createdAt: data.createdAt.getTime(), updatedAt: data.updatedAt.getTime() })))), reply);
    });
}
exports.getAllAdministrators = getAllAdministrators;
