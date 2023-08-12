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
exports.authRoutes = void 0;
const auth_handlers_1 = require("./auth.handlers");
const auth_schemas_1 = require("./auth.schemas");
const authRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.post('/login', {
        schema: auth_schemas_1.LoginSchema,
        handler: auth_handlers_1.LoginHandler,
    });
    route.post('/logout', {
        schema: auth_schemas_1.LogoutSchema,
        handler: auth_handlers_1.LogoutHandler,
    });
    route.post('/forgot-password', {
        schema: auth_schemas_1.ForgotPasswordSchema,
        handler: auth_handlers_1.ForgotPasswordHandler,
    });
    route.post('/reset-password/:adminId/:token64', {
        schema: auth_schemas_1.ResetPasswordSchema,
        handler: auth_handlers_1.ResetPasswordHandler,
    });
    route.post('/refresh-token', {
        schema: auth_schemas_1.RefreshTokenSchema,
        handler: auth_handlers_1.RefreshTokenHandler,
    });
});
exports.authRoutes = authRoutes;
