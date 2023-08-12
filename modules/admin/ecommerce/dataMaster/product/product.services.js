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
exports.createProduct = exports.getAllProduct = void 0;
const prisma_1 = __importDefault(require("../../../../../lib/prisma"));
const utils_1 = require("../../../../../utils");
function getAllProduct(reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.product
            .findMany({
            select: {
                id: true,
                brandId: true,
                categoryId: true,
                name: true,
                description: true,
                price: true,
                type: true,
                createdAt: true,
                updatedAt: true,
            },
        })
            .then((products) => products.map((_a) => {
            var { price, createdAt, updatedAt } = _a, file = __rest(_a, ["price", "createdAt", "updatedAt"]);
            return (Object.assign({ price: price.toNumber(), createdAt: createdAt.getTime(), updatedAt: updatedAt.getTime() }, file));
        })), reply);
    });
}
exports.getAllProduct = getAllProduct;
function createProduct(reply, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.commitToDB)(prisma_1.default.product.create({
            data,
        }), reply);
    });
}
exports.createProduct = createProduct;
