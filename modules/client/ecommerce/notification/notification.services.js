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
exports.countSalesNotifications = exports.countPurchaseNotifications = exports.getAllSalesNotifications = exports.getAllPurchaseNotifications = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const utils_1 = require("../../../../utils");
function getAllPurchaseNotifications(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productOrderNotification
            .findMany({
            where: { userId },
            select: {
                id: true,
                orderId: true,
                type: true,
                readAt: true,
                createdAt: true,
            },
        })
            .then((notifications) => notifications.map((_a) => {
            var { readAt, createdAt } = _a, notification = __rest(_a, ["readAt", "createdAt"]);
            return (Object.assign(Object.assign({}, notification), { readAt: (readAt === null || readAt === void 0 ? void 0 : readAt.getTime()) || null, createdAt: createdAt.getTime() }));
        })), reply);
    });
}
exports.getAllPurchaseNotifications = getAllPurchaseNotifications;
function getAllSalesNotifications(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userProductNotification
            .findMany({
            where: { userId },
            select: {
                id: true,
                productId: true,
                type: true,
                readAt: true,
                createdAt: true,
            },
        })
            .then((notifications) => notifications.map((_a) => {
            var { readAt, createdAt } = _a, notification = __rest(_a, ["readAt", "createdAt"]);
            return (Object.assign(Object.assign({}, notification), { readAt: (readAt === null || readAt === void 0 ? void 0 : readAt.getTime()) || null, createdAt: createdAt.getTime() }));
        })), reply);
    });
}
exports.getAllSalesNotifications = getAllSalesNotifications;
function countPurchaseNotifications(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productOrderNotification.count({ where: { userId } }), reply);
    });
}
exports.countPurchaseNotifications = countPurchaseNotifications;
function countSalesNotifications(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userProductNotification.count({ where: { userId } }), reply);
    });
}
exports.countSalesNotifications = countSalesNotifications;
