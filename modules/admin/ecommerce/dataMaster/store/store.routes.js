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
exports.categoryRoutes = void 0;
const store_handlers_1 = require("./store.handlers");
const store_schema_1 = require("./store.schema");
const categoryRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/', {
        schema: store_schema_1.ListStoresSchema,
        handler: store_handlers_1.ListStoresHandler,
    });
    route.post('/', {
        schema: store_schema_1.CreateStoreSchema,
        handler: store_handlers_1.CreateStoreHandler,
    });
});
exports.categoryRoutes = categoryRoutes;
