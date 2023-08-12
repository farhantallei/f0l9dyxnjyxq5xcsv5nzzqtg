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
exports.productRoutes = void 0;
const product_handlers_1 = require("./product.handlers");
const product_schemas_1 = require("./product.schemas");
const productRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/', {
        schema: product_schemas_1.ListProductsSchema,
        handler: product_handlers_1.ListProductsHandler,
    });
    route.get('/category', {
        schema: product_schemas_1.ListCategoriesSchema,
        handler: product_handlers_1.ListCategoriesHandler,
    });
    route.get('/:id', {
        schema: product_schemas_1.GetProductDetailsSchema,
        handler: product_handlers_1.GetProductDetailsHandler,
    });
    route.get('/:id/review', {
        schema: product_schemas_1.GetProductReviewsSchema,
        handler: product_handlers_1.GetProductReviewsHandler,
    });
    route.post('/:id', {
        schema: product_schemas_1.CreateCheckoutSchema,
        handler: () => { },
    });
    route.post('/:id/review', {
        schema: product_schemas_1.CreateProductReviewSchema,
        handler: () => { },
    });
});
exports.productRoutes = productRoutes;
