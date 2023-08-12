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
exports.countCancelledOrders = exports.countCompleteOrders = exports.countShippedOrders = exports.countIncomingOrders = exports.updateAdminPassword = exports.getAdminById = exports.getAdminByUsernameOrEmail = exports.getAdminByEmail = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const utils_1 = require("../../../utils");
function getAdminByEmail(reply, email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.admin.findUnique({ where: { email } }), reply);
    });
}
exports.getAdminByEmail = getAdminByEmail;
function getAdminByUsernameOrEmail(reply, { username, email }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.admin.findFirst({
            where: { OR: [{ username }, { email }] },
            select: {
                id: true,
                outletId: true,
                name: true,
                username: true,
                email: true,
                mobile: true,
                passwordHash: true,
                profileUrl: true,
                outlet: {
                    select: {
                        name: true,
                        address: true,
                        province: true,
                        regency: true,
                        district: true,
                        village: true,
                        center: true,
                        profileUrl: true,
                    },
                },
            },
        }), reply);
    });
}
exports.getAdminByUsernameOrEmail = getAdminByUsernameOrEmail;
function getAdminById(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.admin.findUnique({
            where: { id },
            select: {
                id: true,
                outletId: true,
                name: true,
                username: true,
                email: true,
                mobile: true,
                passwordHash: true,
                profileUrl: true,
                outlet: {
                    select: {
                        name: true,
                        address: true,
                        province: true,
                        regency: true,
                        district: true,
                        village: true,
                        center: true,
                        profileUrl: true,
                    },
                },
            },
        }), reply);
    });
}
exports.getAdminById = getAdminById;
function updateAdminPassword(reply, id, passwordHash) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.admin.update({ where: { id }, data: { passwordHash } }), reply);
    });
}
exports.updateAdminPassword = updateAdminPassword;
function countIncomingOrders(reply, outletId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productOrder.count({ where: { status: 'checkout', outletId } }), reply);
    });
}
exports.countIncomingOrders = countIncomingOrders;
function countShippedOrders(reply, outletId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productOrder.count({ where: { status: 'shipped', outletId } }), reply);
    });
}
exports.countShippedOrders = countShippedOrders;
function countCompleteOrders(reply, outletId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productOrder.count({ where: { status: 'complete', outletId } }), reply);
    });
}
exports.countCompleteOrders = countCompleteOrders;
function countCancelledOrders(reply, outletId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productOrder.count({ where: { status: 'canceled', outletId } }), reply);
    });
}
exports.countCancelledOrders = countCancelledOrders;
