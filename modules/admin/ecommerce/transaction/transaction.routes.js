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
exports.transactionRoutes = void 0;
const sales_routes_1 = require("./sales/sales.routes");
const admin_1 = require("../../../../middleware/admin");
const purchase_routes_1 = require("./purchase/purchase.routes");
const transactionRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.addHook('preHandler', admin_1.AuthenticationHandler);
    route.register(sales_routes_1.salesRoutes, { prefix: 'sales' });
    route.register(purchase_routes_1.purchaseRoutes, { prefix: 'purchase' });
});
exports.transactionRoutes = transactionRoutes;
