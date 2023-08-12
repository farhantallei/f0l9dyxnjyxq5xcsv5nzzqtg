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
exports.getAllComplete = exports.getAllRefused = exports.getAllBought = exports.getAllProductSubmission = void 0;
const prisma_1 = __importDefault(require("../../../../../lib/prisma"));
const utils_1 = require("../../../../../utils");
function getAllProductSubmission(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userProduct
            .findMany({
            where: { userId, status: 'requested' },
            select: {
                id: true,
                invoice: true,
                user: { select: { name: true } },
                name: true,
                price: true,
                weight: true,
                createdAt: true,
            },
        })
            .then((orders) => orders.map((_a) => {
            var { createdAt, price, weight, user: { name }, name: product } = _a, rest = __rest(_a, ["createdAt", "price", "weight", "user", "name"]);
            return (Object.assign({ name,
                product, createdAt: createdAt.getTime(), price: price.toNumber(), weight: weight.toNumber() }, rest));
        })), reply);
    });
}
exports.getAllProductSubmission = getAllProductSubmission;
function getAllBought(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userProduct
            .findMany({
            where: { userId, status: 'pickup' },
            select: {
                id: true,
                invoice: true,
                user: { select: { name: true } },
                name: true,
                price: true,
                weight: true,
                createdAt: true,
            },
        })
            .then((orders) => orders.map((_a) => {
            var { createdAt, price, weight, user: { name }, name: product } = _a, rest = __rest(_a, ["createdAt", "price", "weight", "user", "name"]);
            return (Object.assign({ name,
                product, createdAt: createdAt.getTime(), price: price.toNumber(), weight: weight.toNumber() }, rest));
        })), reply);
    });
}
exports.getAllBought = getAllBought;
function getAllRefused(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userProduct
            .findMany({
            where: { userId, status: 'rejected' },
            select: {
                id: true,
                invoice: true,
                user: { select: { name: true } },
                name: true,
                price: true,
                weight: true,
                createdAt: true,
            },
        })
            .then((orders) => orders.map((_a) => {
            var { createdAt, price, weight, user: { name }, name: product } = _a, rest = __rest(_a, ["createdAt", "price", "weight", "user", "name"]);
            return (Object.assign({ name,
                product, createdAt: createdAt.getTime(), price: price.toNumber(), weight: weight.toNumber() }, rest));
        })), reply);
    });
}
exports.getAllRefused = getAllRefused;
function getAllComplete(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userProduct
            .findMany({
            where: { userId, status: 'complete' },
            select: {
                id: true,
                invoice: true,
                user: { select: { name: true } },
                name: true,
                price: true,
                weight: true,
                createdAt: true,
            },
        })
            .then((orders) => orders.map((_a) => {
            var { createdAt, price, weight, user: { name }, name: product } = _a, rest = __rest(_a, ["createdAt", "price", "weight", "user", "name"]);
            return (Object.assign({ name,
                product, createdAt: createdAt.getTime(), price: price.toNumber(), weight: weight.toNumber() }, rest));
        })), reply);
    });
}
exports.getAllComplete = getAllComplete;
