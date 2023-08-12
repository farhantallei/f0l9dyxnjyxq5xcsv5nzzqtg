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
exports.deleteFavoriteProduct = exports.addFavoriteProduct = exports.getProductById = exports.getFavoriteProductById = exports.getAllFavoriteProducts = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const utils_1 = require("../../../../utils");
function getAllFavoriteProducts(reply, userId, { categoryId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productFavoritesOnUsers
            .findMany({
            where: { userId, product: { categoryId } },
            select: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        category: { select: { category: true } },
                        images: {
                            select: { url: true },
                            orderBy: { sequence: 'asc' },
                            take: 1,
                        },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        })
            .then((products) => products.map(({ product: { id, name, price, category: { category }, images, }, }) => ({
            id,
            name,
            price: price.toNumber(),
            category,
            thumbnailUrl: images.length ? images[0].url : null,
        }))), reply);
    });
}
exports.getAllFavoriteProducts = getAllFavoriteProducts;
function getFavoriteProductById(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productFavoritesOnUsers.findUnique({
            where: { userId_productId: id },
        }), reply);
    });
}
exports.getFavoriteProductById = getFavoriteProductById;
function getProductById(reply, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.product.findUnique({ where: { id: productId } }), reply);
    });
}
exports.getProductById = getProductById;
function addFavoriteProduct(reply, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productFavoritesOnUsers.create({ data }), reply);
    });
}
exports.addFavoriteProduct = addFavoriteProduct;
function deleteFavoriteProduct(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productFavoritesOnUsers.delete({ where: { userId_productId: id } }), reply);
    });
}
exports.deleteFavoriteProduct = deleteFavoriteProduct;
