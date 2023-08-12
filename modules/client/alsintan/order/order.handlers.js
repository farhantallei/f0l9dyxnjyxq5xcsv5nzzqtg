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
exports.GetCashPaymentMethodHandler = exports.GetTransferPaymentMethodHandler = exports.GetOrderDetailsHandler = exports.ListOrdersHandler = void 0;
const order_services_1 = require("./order.services");
const ListOrdersHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 20, status } = request.query;
    const userId = request.userId;
    const orders = yield (0, order_services_1.getAllRequestedOrders)(reply, userId, {
        page,
        limit,
        status,
    });
    const productCount = yield (0, order_services_1.countAllRequestedOrders)(reply, userId);
    const startIdx = (page - 1) * limit;
    const endIdx = page * limit;
    const prevPage = startIdx > 0
        ? startIdx < productCount
            ? page - 1
            : Math.ceil(productCount / limit)
        : null;
    const nextPage = endIdx < productCount ? page + 1 : null;
    return reply.send({ orders, prevPage, nextPage });
});
exports.ListOrdersHandler = ListOrdersHandler;
const GetOrderDetailsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = request.params;
    const userId = request.userId;
    const order = yield (0, order_services_1.getOrderDetailsById)(reply, { userId, orderId });
    if (!order)
        return reply.notFound('Alsintan order is not found');
    return reply.send(order);
});
exports.GetOrderDetailsHandler = GetOrderDetailsHandler;
const GetTransferPaymentMethodHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = request.params;
    const userId = request.userId;
    const accounts = yield (0, order_services_1.getBankAccountsById)(reply);
    const existingInvoice = yield (0, order_services_1.getInvoiceByOrderId)(reply, { orderId, userId });
    if (!existingInvoice)
        return reply.notFound('Alsintan order invoice is not found');
    const { paymentMethod } = existingInvoice, invoice = __rest(existingInvoice, ["paymentMethod"]);
    if (paymentMethod !== 'bank_transfer')
        return reply.badRequest('Alsintan order payment method is cash');
    return reply.send(Object.assign(Object.assign({}, invoice), { accounts }));
});
exports.GetTransferPaymentMethodHandler = GetTransferPaymentMethodHandler;
const GetCashPaymentMethodHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = request.params;
    const userId = request.userId;
    const existingInvoice = yield (0, order_services_1.getInvoiceByOrderId)(reply, { orderId, userId });
    if (!existingInvoice)
        return reply.notFound('Alsintan order invoice is not found');
    const { paymentMethod } = existingInvoice, invoice = __rest(existingInvoice, ["paymentMethod"]);
    if (paymentMethod !== 'cash')
        return reply.badRequest('Alsintan order payment method is bank transfer');
    return reply.send(invoice);
});
exports.GetCashPaymentMethodHandler = GetCashPaymentMethodHandler;
