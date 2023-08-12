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
exports.adminRoutes = void 0;
const auth_routes_1 = require("./auth/auth.routes");
const ecommerce_routes_1 = require("./ecommerce/ecommerce.routes");
const agronom_routes_1 = require("./agronom/agronom.routes");
const adminRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.register(auth_routes_1.authRoutes, { prefix: 'auth' });
    route.register(ecommerce_routes_1.ecommerceRoutes, { prefix: 'ecommerce' });
    route.register(agronom_routes_1.agronomRoutes, { prefix: 'agronom' });
});
exports.adminRoutes = adminRoutes;
