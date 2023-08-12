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
exports.userManagementRoutes = void 0;
const agronom_routes_1 = require("./agronom/agronom.routes");
const administrator_routes_1 = require("./administrator/administrator.routes");
const client_routes_1 = require("./client/client.routes");
const userManagementRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.register(agronom_routes_1.agronomRoutes, { prefix: 'agronom' });
    route.register(administrator_routes_1.administratorRoutes, { prefix: 'administrator' });
    route.register(client_routes_1.clientRoutes, { prefix: 'client' });
});
exports.userManagementRoutes = userManagementRoutes;
