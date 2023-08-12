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
const transaction_routes_1 = require("./transaction/transaction.routes");
const userManagement_routes_1 = require("./userManagement/userManagement.routes");
const dataMaster_routes_1 = require("./dataMaster/dataMaster.routes");
const ecommerceRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.register(transaction_routes_1.transactionRoutes, { prefix: 'transaction' });
    route.register(userManagement_routes_1.userManagementRoutes, { prefix: 'user-management' });
    route.register(dataMaster_routes_1.dataMasterRoutes, { prefix: 'data-master' });
});
exports.ecommerceRoutes = ecommerceRoutes;
