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
exports.ecommerceRoutes = void 0;
const product_routes_1 = require("./product/product.routes");
const favorite_routes_1 = require("./favorite/favorite.routes");
const notification_routes_1 = require("./notification/notification.routes");
const cart_routes_1 = require("./cart/cart.routes");
const ecommerce_schemas_1 = require("./ecommerce.schemas");
const order_routes_1 = require("./order/order.routes");
const chat_routes_1 = require("./chat/chat.routes");
const client_1 = require("../../../middleware/client");
const ecommerceRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.addHook('preHandler', client_1.AuthenticationHandler);
    route.get('/home', {
        schema: ecommerce_schemas_1.GetHomeSchema,
        handler: () => { },
    });
    route.get('/checkout', {
        schema: ecommerce_schemas_1.GetCheckoutSchema,
        handler: () => { },
    });
    route.register(product_routes_1.productRoutes, { prefix: 'product' });
    route.register(favorite_routes_1.favoriteRoutes, { prefix: 'favorite' });
    route.register(notification_routes_1.notificationRoutes, { prefix: 'notification' });
    route.register(cart_routes_1.cartRoutes, { prefix: 'cart' });
    route.register(order_routes_1.orderRoutes, { prefix: 'order' });
    route.register(chat_routes_1.chatRoutes, { prefix: 'chat' });
});
exports.ecommerceRoutes = ecommerceRoutes;
