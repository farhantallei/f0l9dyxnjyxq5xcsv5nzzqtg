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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentPlotlyProductHandler = exports.RentDailyProductHandler = exports.GetProductReviewsHandler = exports.GetProductDetailsHandler = exports.ListProductsHandler = void 0;
const product_services_1 = require("./product.services");
const ListProductsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 8, searchQuery } = request.query;
    const products = yield (0, product_services_1.getAllProducts)(reply, { page, limit }, { searchQuery });
    const productCount = yield (0, product_services_1.countProducts)(reply, { searchQuery });
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
    const { productId } = request.params;
    const product = yield (0, product_services_1.getProductDetails)(reply, productId);
    if (!product)
        return reply.notFound('Alsintan product is not found');
    const reviewCount = yield (0, product_services_1.countProductReviews)(reply, productId);
    return reply.send(Object.assign(Object.assign({}, product), { meta: { reviewCount } }));
});
exports.GetProductDetailsHandler = GetProductDetailsHandler;
const GetProductReviewsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = request.params;
    const { page = 1, limit = 10 } = request.query;
    const product = yield (0, product_services_1.getProductById)(reply, productId);
    if (!product)
        return reply.badRequest('Alsintan product does not exists');
    const reviews = yield (0, product_services_1.getProductReviews)(reply, productId, { page, limit });
    const productCount = yield (0, product_services_1.countProductReviews)(reply, productId);
    const startIdx = (page - 1) * limit;
    const endIdx = page * limit;
    const prevPage = startIdx > 0
        ? startIdx < productCount
            ? page - 1
            : Math.ceil(productCount / limit)
        : null;
    const nextPage = endIdx < productCount ? page + 1 : null;
    return reply.send({ reviews, prevPage, nextPage });
});
exports.GetProductReviewsHandler = GetProductReviewsHandler;
const RentDailyProductHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = request.params;
    const _a = request.body, { userAddressId } = _a, orderData = __rest(_a, ["userAddressId"]);
    const userId = request.userId;
    const today = new Date();
    const todayDate = today.getDate();
    const fromDate = new Date(orderData.from).getDate();
    const toDate = new Date(orderData.to).getDate();
    const dayRange = toDate - fromDate + 1;
    if (fromDate < todayDate)
        return reply.badRequest('body\\"from" should be greater than or equal to today');
    if (fromDate === todayDate) {
        if (today.getHours() >= 15)
            return reply.badRequest('body\\"from" should be greater than today');
    }
    if (new Date(orderData.from).getTime() > new Date(orderData.to).getTime())
        return reply.badRequest('body\\"from" should be less than body\\"to"');
    const product = yield (0, product_services_1.getProductById)(reply, productId);
    if (!product)
        return reply.badRequest('Alsintan product does not exists');
    if (product.rentalType !== 'daily')
        return reply.badRequest('Alsintan product rental type is plotly');
    const userAddress = yield (0, product_services_1.getUserAddressById)(reply, {
        id: userAddressId,
        userId,
    });
    if (!userAddress)
        return reply.badRequest('User address does not exists');
    const price = product.price.toNumber();
    const subtotal = dayRange * price;
    const discount = 0;
    yield (0, product_services_1.createProductOrder)(reply, product.id, Object.assign(Object.assign({}, orderData), { userId, homeAddress: userAddress.address, homeAddressName: userAddress.name, homeAddressMobile: userAddress.mobile, price,
        subtotal,
        discount, total: Math.max(subtotal - discount, 0) }));
    return reply.code(204).send(undefined);
});
exports.RentDailyProductHandler = RentDailyProductHandler;
const RentPlotlyProductHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = request.params;
    const _b = request.body, { userAddressId } = _b, orderData = __rest(_b, ["userAddressId"]);
    const userId = request.userId;
    const today = new Date();
    const todayDate = today.getDate();
    const fromDate = new Date(orderData.from).getDate();
    if (fromDate < todayDate)
        return reply.badRequest('body\\"from" should be greater than or equal to today');
    if (fromDate === todayDate) {
        if (today.getHours() >= 15)
            return reply.badRequest('body\\"from" should be greater than today');
    }
    if (orderData.plot > orderData.landAreaTotal)
        return reply.badRequest('body\\"plot" should be less than or equal to body\\"landAreaTotal"');
    const product = yield (0, product_services_1.getProductById)(reply, productId);
    if (!product)
        return reply.badRequest('Alsintan product does not exists');
    if (product.rentalType !== 'plotly')
        return reply.badRequest('Alsintan product rental type is daily');
    const userAddress = yield (0, product_services_1.getUserAddressById)(reply, {
        id: userAddressId,
        userId,
    });
    if (!userAddress)
        return reply.badRequest('User address does not exists');
    const price = product.price.toNumber();
    const subtotal = orderData.plot * price;
    const discount = 0;
    yield (0, product_services_1.createProductOrder)(reply, product.id, Object.assign(Object.assign({}, orderData), { userId, homeAddress: userAddress.address, homeAddressName: userAddress.name, homeAddressMobile: userAddress.mobile, price,
        subtotal,
        discount, total: Math.max(subtotal - discount, 0) }));
    return reply.code(204).send(undefined);
});
exports.RentPlotlyProductHandler = RentPlotlyProductHandler;
