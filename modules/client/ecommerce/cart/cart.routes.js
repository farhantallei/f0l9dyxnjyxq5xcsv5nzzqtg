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
exports.cartRoutes = void 0;
const cart_handlers_1 = require("./cart.handlers");
const cart_schemas_1 = require("./cart.schemas");
const cartRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/', {
        schema: cart_schemas_1.ListCartProductsSchema,
        handler: cart_handlers_1.ListCartProductsHandler,
    });
    route.post('/', {
        schema: cart_schemas_1.AddCartProductSchema,
        handler: cart_handlers_1.AddCartProductHandler,
    });
    route.put('/', {
        schema: cart_schemas_1.UpdateCartProductSchema,
        handler: cart_handlers_1.UpdateCartProductHandler,
    });
    route.post('/:id', {
        schema: cart_schemas_1.CreateCheckoutSchema,
        handler: () => { },
    });
    route.delete('/:outletId', {
        schema: cart_schemas_1.DeleteCartProductOutletSchema,
        handler: cart_handlers_1.DeleteCartProductOutletHandler,
    });
    route.delete('/:outletId/:productId', {
        schema: cart_schemas_1.DeleteCartProductSchema,
        handler: cart_handlers_1.DeleteCartProductHandler,
    });
});
exports.cartRoutes = cartRoutes;
