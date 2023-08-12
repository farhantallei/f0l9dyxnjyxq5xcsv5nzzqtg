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
exports.routes = void 0;
const client_routes_1 = require("../modules/client/client.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const agronom_routes_1 = require("../modules/agronom/agronom.routes");
const routes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.register(client_routes_1.clientRoutes, { prefix: 'client' });
    route.register(admin_routes_1.adminRoutes, { prefix: 'admin' });
    route.register(agronom_routes_1.agronomRoutes, { prefix: 'agronom' });
});
exports.routes = routes;
