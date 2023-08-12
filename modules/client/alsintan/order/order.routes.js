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
exports.orderRoutes = void 0;
const order_schemas_1 = require("./order.schemas");
const order_handlers_1 = require("./order.handlers");
const orderRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/', {
        schema: order_schemas_1.ListOrdersSchema,
        handler: order_handlers_1.ListOrdersHandler,
    });
    route.get('/:orderId', {
        schema: order_schemas_1.GetOrderDetailsSchema,
        handler: order_handlers_1.GetOrderDetailsHandler,
    });
    route.get('/:orderId/transfer', {
        schema: order_schemas_1.GetTransferPaymentMethodSchema,
        handler: order_handlers_1.GetTransferPaymentMethodHandler,
    });
    route.get('/:orderId/cash', {
        schema: order_schemas_1.GetCashPaymentMethodSchema,
        handler: order_handlers_1.GetCashPaymentMethodHandler,
    });
});
exports.orderRoutes = orderRoutes;
