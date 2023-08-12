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
exports.getAllComplete = exports.getAllCancelled = exports.getAllShipped = exports.getAllIncomingOrders = void 0;
const prisma_1 = __importDefault(require("../../../../../lib/prisma"));
const utils_1 = require("../../../../../utils");
function getAllIncomingOrders(reply, outletId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productOrder
            .findMany({
            where: { outletId, status: 'checkout' },
            select: {
                id: true,
                user: { select: { name: true } },
                invoice: { select: { invoice: true } },
                total: true,
                paymentMethod: true,
                createdAt: true,
            },
        })
            .then((orders) => orders.map((_a) => {
            var { createdAt, total, user: { name: customer }, invoice } = _a, rest = __rest(_a, ["createdAt", "total", "user", "invoice"]);
            return (Object.assign({ invoice: (invoice === null || invoice === void 0 ? void 0 : invoice.invoice) || null, customer, createdAt: createdAt.getTime(), priceTotal: total.toNumber(), productTotal: 34 }, rest));
        })), reply);
    });
}
exports.getAllIncomingOrders = getAllIncomingOrders;
function getAllShipped(reply, outletId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productOrder
            .findMany({
            where: { outletId, status: 'shipped' },
            select: {
                id: true,
                invoice: { select: { invoice: true } },
                user: { select: { name: true } },
                total: true,
                paymentMethod: true,
                createdAt: true,
            },
        })
            .then((orders) => orders.map((_a) => {
            var { createdAt, total, user: { name: customer }, invoice } = _a, rest = __rest(_a, ["createdAt", "total", "user", "invoice"]);
            return (Object.assign({ invoice: (invoice === null || invoice === void 0 ? void 0 : invoice.invoice) || null, customer, createdAt: createdAt.getTime(), priceTotal: total.toNumber(), productTotal: 34 }, rest));
        })), reply);
    });
}
exports.getAllShipped = getAllShipped;
function getAllCancelled(reply, outletId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productOrder
            .findMany({
            where: { outletId, status: 'canceled' },
            select: {
                id: true,
                user: { select: { name: true } },
                invoice: { select: { invoice: true } },
                total: true,
                paymentMethod: true,
                createdAt: true,
            },
        })
            .then((orders) => orders.map((_a) => {
            var { createdAt, total, user: { name: customer }, invoice } = _a, rest = __rest(_a, ["createdAt", "total", "user", "invoice"]);
            return (Object.assign({ invoice: (invoice === null || invoice === void 0 ? void 0 : invoice.invoice) || null, customer, createdAt: createdAt.getTime(), priceTotal: total.toNumber(), productTotal: 34 }, rest));
        })), reply);
    });
}
exports.getAllCancelled = getAllCancelled;
function getAllComplete(reply, outletId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productOrder
            .findMany({
            where: { outletId, status: 'complete' },
            select: {
                id: true,
                user: { select: { name: true } },
                invoice: { select: { invoice: true } },
                total: true,
                paymentMethod: true,
                createdAt: true,
            },
        })
            .then((orders) => orders.map((_a) => {
            var { createdAt, total, user: { name: customer }, invoice } = _a, rest = __rest(_a, ["createdAt", "total", "user", "invoice"]);
            return (Object.assign({ invoice: (invoice === null || invoice === void 0 ? void 0 : invoice.invoice) || null, customer, createdAt: createdAt.getTime(), priceTotal: total.toNumber(), productTotal: 34 }, rest));
        })), reply);
    });
}
exports.getAllComplete = getAllComplete;
