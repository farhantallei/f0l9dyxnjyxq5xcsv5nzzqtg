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
exports.GetProductReviewsHandler = exports.GetProductOutletsHandler = exports.GetProductDetailsHandler = exports.ListProductsHandler = exports.ListCategoriesHandler = void 0;
const product_services_1 = require("./product.services");
const ListCategoriesHandler = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, product_services_1.getAllCategories)(reply);
    return reply.send(categories);
});
exports.ListCategoriesHandler = ListCategoriesHandler;
const ListProductsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 4, categoryId, searchQuery } = request.query;
    if (categoryId) {
        const isCategoryExists = yield (0, product_services_1.getCategoryById)(reply, categoryId);
        if (!isCategoryExists)
            return reply.badRequest('Category does not exists');
    }
    const products = yield (0, product_services_1.getAllProducts)(reply, { page, limit }, { categoryId, searchQuery });
    const productCount = yield (0, product_services_1.countProducts)(reply, { categoryId, searchQuery });
    const startIdx = (page - 1) * limit;
    const endIdx = page * limit;
    const prevPage = startIdx > 0
        ? startIdx < productCount
            ? page - 1
            : Math.ceil(productCount / limit)
        : null;
    const nextPage = endIdx < productCount ? page + 1 : null;
    return reply.send({ products, prevPage, nextPage });
});
exports.ListProductsHandler = ListProductsHandler;
const GetProductDetailsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const userId = request.userId;
    const product = yield (0, product_services_1.getProductDetails)(reply, id);
    if (!product)
        return reply.notFound('Product is not found');
    const rating = yield (0, product_services_1.averageProductRating)(reply, id);
    const sold = yield (0, product_services_1.countProductSold)(reply, id);
    const reviewCount = yield (0, product_services_1.countProductReviews)(reply, id);
    const isFavorited = yield (0, product_services_1.getFavoriteProductById)(reply, {
        userId,
        productId: id,
    });
    return reply.send(Object.assign(Object.assign({}, product), { rating, meta: { reviewCount, sold }, favorited: !!isFavorited }));
});
exports.GetProductDetailsHandler = GetProductDetailsHandler;
const GetProductOutletsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () { });
exports.GetProductOutletsHandler = GetProductOutletsHandler;
const GetProductReviewsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { page = 1, limit = 10 } = request.query;
    const product = yield (0, product_services_1.getProductById)(reply, id);
    if (!product)
        return reply.badRequest('Product does not exists');
    const reviews = yield (0, product_services_1.getProductReviews)(reply, id, { page, limit });
    const startIdx = (page - 1) * limit;
    const endIdx = page * limit;
    let prev = null;
    let next = null;
    if (startIdx > 0) {
        prev = {
            page: page - 1,
            limit,
        };
    }
    if (endIdx < (yield (0, product_services_1.countProductReviews)(reply, id))) {
        next = {
            page: page + 1,
            limit,
        };
    }
    return reply.send({ prev, next, reviews });
});
exports.GetProductReviewsHandler = GetProductReviewsHandler;
