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
exports.clientRoutes = void 0;
const client_handlers_1 = require("./client.handlers");
const client_schema_1 = require("./client.schema");
const clientRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/', {
        schema: client_schema_1.ListClientSchema,
        handler: client_handlers_1.ListClientHandler,
    });
    route.post('/', {
        schema: client_schema_1.CreateClientSchema,
        handler: client_handlers_1.CreateClientHandler,
    });
});
exports.clientRoutes = clientRoutes;
