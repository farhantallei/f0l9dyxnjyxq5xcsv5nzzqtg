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
const category_handlers_1 = require("./category.handlers");
const category_schema_1 = require("./category.schema");
const categoryRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/', {
        schema: category_schema_1.ListCategorysSchema,
        handler: category_handlers_1.ListCategorysHandler,
    });
    route.post('/', {
        schema: category_schema_1.CreateCategorySchema,
        handler: category_handlers_1.CreateCategoryHandler,
    });
});
exports.categoryRoutes = categoryRoutes;
