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
exports.favoriteRoutes = void 0;
const favorite_handlers_1 = require("./favorite.handlers");
const favorite_schemas_1 = require("./favorite.schemas");
const favoriteRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/', {
        schema: favorite_schemas_1.ListFavoriteProductsSchema,
        handler: favorite_handlers_1.ListFavoriteProductsHandler,
    });
    route.post('/', {
        schema: favorite_schemas_1.AddFavoriteProductSchema,
        handler: favorite_handlers_1.AddFavoriteProductHandler,
    });
    route.delete('/:productId', {
        schema: favorite_schemas_1.DeleteFavoriteProductSchema,
        handler: favorite_handlers_1.DeleteFavoriteProductHandler,
    });
});
exports.favoriteRoutes = favoriteRoutes;
