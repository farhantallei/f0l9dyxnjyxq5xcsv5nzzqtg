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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFavoriteProductHandler = exports.AddFavoriteProductHandler = exports.ListFavoriteProductsHandler = void 0;
const favorite_services_1 = require("./favorite.services");
const ListFavoriteProductsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = request.query;
    const userId = request.userId;
    const products = yield (0, favorite_services_1.getAllFavoriteProducts)(reply, userId, { categoryId });
    return reply.send(products);
});
exports.ListFavoriteProductsHandler = ListFavoriteProductsHandler;
const AddFavoriteProductHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = request.body;
    const userId = request.userId;
    const isProductExists = yield (0, favorite_services_1.getProductById)(reply, productId);
    if (!isProductExists)
        return reply.badRequest('Product does not exists');
    const isProductInFavorites = yield (0, favorite_services_1.getFavoriteProductById)(reply, {
        userId,
        productId,
    });
    if (isProductInFavorites)
        return reply.badRequest('Product already added to favorites');
    yield (0, favorite_services_1.addFavoriteProduct)(reply, { userId, productId });
    return reply.code(204).send(undefined);
});
exports.AddFavoriteProductHandler = AddFavoriteProductHandler;
const DeleteFavoriteProductHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = request.params;
    const userId = request.userId;
    const isProductExists = yield (0, favorite_services_1.getProductById)(reply, productId);
    if (!isProductExists)
        return reply.badRequest('Product does not exists');
    const isProductInFavorites = yield (0, favorite_services_1.getFavoriteProductById)(reply, {
        userId,
        productId,
    });
    if (!isProductInFavorites)
        return reply.badRequest('Product is not in favorites');
    yield (0, favorite_services_1.deleteFavoriteProduct)(reply, { userId, productId });
    return reply.code(204).send(undefined);
});
exports.DeleteFavoriteProductHandler = DeleteFavoriteProductHandler;
