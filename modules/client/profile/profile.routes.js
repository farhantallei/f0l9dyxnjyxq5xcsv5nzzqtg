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
exports.profileRoutes = void 0;
const profile_schemas_1 = require("./profile.schemas");
const profile_handlers_1 = require("./profile.handlers");
const address_routes_1 = require("./address/address.routes");
const client_1 = require("../../../middleware/client");
const profileRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.addHook('preHandler', client_1.AuthenticationHandler);
    route.get('/', {
        schema: profile_schemas_1.GetProfileSchema,
        handler: profile_handlers_1.GetProfileHandler,
    });
    route.get('/review', {
        schema: profile_schemas_1.GetProductReviewsSchema,
        handler: () => { },
    });
    route.put('/', {
        schema: profile_schemas_1.UpdateProfileSchema,
        handler: profile_handlers_1.UpdateProfileHandler,
    });
    route.put('/password', {
        schema: profile_schemas_1.UpdatePasswordSchema,
        handler: profile_handlers_1.UpdatePasswordHandler,
    });
    route.put('/review/:id', {
        schema: profile_schemas_1.UpdateProductReviewSchema,
        handler: () => { },
    });
    route.post('/avatar', {
        schema: profile_schemas_1.UpdateDisplayPictureSchema,
        handler: profile_handlers_1.UpdateDisplayPictureHandler,
    });
    route.delete('/:token64', {
        schema: profile_schemas_1.DeleteAccountSchema,
        handler: profile_handlers_1.DeleteAccountHandler,
    });
    route.register(address_routes_1.addressRoutes, { prefix: 'address' });
});
exports.profileRoutes = profileRoutes;
