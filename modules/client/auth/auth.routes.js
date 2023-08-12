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
const client_1 = require("../../../middleware/client");
const authRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.post('/register', {
        schema: auth_schemas_1.RegisterSchema,
        handler: auth_handlers_1.RegisterHandler,
    });
    route.post('/register/3rd-party', {
        schema: auth_schemas_1.RegisterMediaSocialSchema,
        handler: auth_handlers_1.RegisterMediaSocialHandler,
    });
    route.post('/resend-activation', {
        schema: auth_schemas_1.ResendActivationSchema,
        handler: auth_handlers_1.ResendActivationHandler,
    });
    route.post('/login', {
        schema: auth_schemas_1.LoginSchema,
        handler: auth_handlers_1.LoginHandler,
    });
    route.post('/login/3rd-party', {
        schema: auth_schemas_1.LoginMediaSocialSchema,
        handler: auth_handlers_1.LoginMediaSocialHandler,
    });
    route.post('/forgot-password', {
        schema: auth_schemas_1.ForgotPasswordSchema,
        handler: auth_handlers_1.ForgotPasswordHandler,
    });
    route.post('/reset-password/:userId/:token64', {
        schema: auth_schemas_1.ResetPasswordSchema,
        handler: auth_handlers_1.ResetPasswordHandler,
    });
    route.post('/activation/:token64', {
        schema: auth_schemas_1.AccountActivationSchema,
        handler: auth_handlers_1.AccountActivationHandler,
    });
    route.post('/verify', {
        schema: auth_schemas_1.VerifySchema,
        handler: auth_handlers_1.VerifyHandler,
        preHandler: client_1.VerificationHandler,
    });
    route.post('/logout', {
        schema: auth_schemas_1.LogoutSchema,
        handler: auth_handlers_1.LogoutHandler,
        preHandler: client_1.AuthenticationHandler,
    });
});
exports.authRoutes = authRoutes;
