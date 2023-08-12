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
exports.salesRoutes = void 0;
const sales_handlers_1 = require("./sales.handlers");
const sales_schemas_1 = require("./sales.schemas");
const salesRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/incoming-orders', {
        schema: sales_schemas_1.ListIncomingOrdersSchema,
        handler: sales_handlers_1.ListIncomingOrdersHandler,
    });
    route.get('/shipped', {
        schema: sales_schemas_1.ListShippedSchema,
        handler: sales_handlers_1.ListShippedHandler,
    });
    route.get('/cancelled', {
        schema: sales_schemas_1.ListCancelledSchema,
        handler: sales_handlers_1.ListCancelledHandler,
    });
    route.get('/complete', {
        schema: sales_schemas_1.ListCompleteSchema,
        handler: sales_handlers_1.ListCompleteHandler,
    });
});
exports.salesRoutes = salesRoutes;
