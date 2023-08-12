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
exports.DeleteCartProductOutletHandler = exports.DeleteCartProductHandler = exports.UpdateCartProductHandler = exports.AddCartProductHandler = exports.ListCartProductsHandler = void 0;
const cart_services_1 = require("./cart.services");
const ListCartProductsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.userId;
    const products = yield (0, cart_services_1.getAllCartProducts)(reply, userId);
    return reply.send(products);
});
exports.ListCartProductsHandler = ListCartProductsHandler;
const AddCartProductHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { outletId, productId, quantity } = request.body;
    const userId = request.userId;
    const isOutletExists = yield (0, cart_services_1.getOutletById)(reply, outletId);
    if (!isOutletExists)
        return reply.badRequest('Outlet does not exists');
    const isProductExists = yield (0, cart_services_1.getProductById)(reply, productId);
    if (!isProductExists)
        return reply.badRequest('Product does not exists');
    const isProductInCart = yield (0, cart_services_1.getCartProductById)(reply, {
        userId,
        outletId,
        productId,
    });
    if (isProductInCart)
        return reply.badRequest('Product already added to cart');
    const produckStock = yield (0, cart_services_1.getProductStock)(reply, { outletId, productId });
    if (produckStock == null)
        return reply.badRequest('Product is not available in the chosen Outlet');
    if (produckStock <= 0)
        return reply.badRequest('Product is currently out of stock in the chosen Outlet');
    if (quantity > produckStock)
        return reply.badRequest('Quantity exceeds the available stock in the chosen Outlet');
    yield (0, cart_services_1.addCartProduct)(reply, { userId, outletId, productId }, quantity);
    return reply.code(204).send(undefined);
});
exports.AddCartProductHandler = AddCartProductHandler;
const UpdateCartProductHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { outletId, productId, quantity } = request.body;
    const userId = request.userId;
    const isOutletExists = yield (0, cart_services_1.getOutletById)(reply, outletId);
    if (!isOutletExists)
        return reply.badRequest('Outlet does not exists');
    const isProductExists = yield (0, cart_services_1.getProductById)(reply, productId);
    if (!isProductExists)
        return reply.badRequest('Product does not exists');
    const isProductInCart = yield (0, cart_services_1.getCartProductById)(reply, {
        userId,
        outletId,
        productId,
    });
    if (!isProductInCart)
        return reply.badRequest('Product is not in cart');
    yield (0, cart_services_1.updateCartProduct)(reply, { userId, outletId, productId }, quantity);
    return reply.code(204).send(undefined);
});
exports.UpdateCartProductHandler = UpdateCartProductHandler;
const DeleteCartProductHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, outletId } = request.params;
    const userId = request.userId;
    const isOutletExists = yield (0, cart_services_1.getOutletById)(reply, outletId);
    if (!isOutletExists)
        return reply.badRequest('Outlet does not exists');
    const isProductExists = yield (0, cart_services_1.getProductById)(reply, productId);
    if (!isProductExists)
        return reply.badRequest('Product does not exists');
    const isProductInCart = yield (0, cart_services_1.getCartProductById)(reply, {
        userId,
        productId,
        outletId,
    });
    if (!isProductInCart)
        return reply.badRequest('Product is not in cart');
    yield (0, cart_services_1.deleteCartProduct)(reply, { userId, productId, outletId });
    return reply.code(204).send(undefined);
});
exports.DeleteCartProductHandler = DeleteCartProductHandler;
const DeleteCartProductOutletHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { outletId } = request.params;
    const userId = request.userId;
    const isOutletExists = yield (0, cart_services_1.getOutletById)(reply, outletId);
    if (!isOutletExists)
        return reply.badRequest('Outlet does not exists');
    yield (0, cart_services_1.deleteCartProductOutlet)(reply, userId, outletId);
    return reply.code(204).send(undefined);
});
exports.DeleteCartProductOutletHandler = DeleteCartProductOutletHandler;
