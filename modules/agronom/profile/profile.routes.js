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
const profile_handlers_1 = require("./profile.handlers");
const profile_schemas_1 = require("./profile.schemas");
const agronom_1 = require("../../../middleware/agronom");
const profileRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.addHook('preHandler', agronom_1.AuthenticationHandler);
    route.get('/', {
        schema: profile_schemas_1.GetProfileSchema,
        handler: profile_handlers_1.GetProfileHandler,
    });
});
exports.profileRoutes = profileRoutes;
