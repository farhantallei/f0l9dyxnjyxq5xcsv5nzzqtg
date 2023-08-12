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
exports.affiliateRoutes = void 0;
const affiliate_schemas_1 = require("./affiliate.schemas");
const affiliateRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/home', {
        schema: affiliate_schemas_1.GetHomeSchema,
        handler: () => { },
    });
    route.get('/recruit', {
        schema: affiliate_schemas_1.GetRecruitsSchema,
        handler: () => { },
    });
    route.get('/recruit/:id', {
        schema: affiliate_schemas_1.GetRecruitDetailsSchema,
        handler: () => { },
    });
    route.get('/notification', {
        schema: affiliate_schemas_1.GetNotificationsSchema,
        handler: () => { },
    });
    route.get('/payment', {
        schema: affiliate_schemas_1.GetPaymentSchema,
        handler: () => { },
    });
    route.get('/payment/:id', {
        schema: affiliate_schemas_1.GetPaymentDetailsSchema,
        handler: () => { },
    });
    route.get('/payment/:id/invoice', {
        schema: affiliate_schemas_1.GetInvoiceSchema,
        handler: () => { },
    });
    route.get('/profile', {
        schema: affiliate_schemas_1.GetProfileSchema,
        handler: () => { },
    });
    route.put('/profile', {
        schema: affiliate_schemas_1.UpdateProfileSchema,
        handler: () => { },
    });
    route.put('/profile/password', {
        schema: affiliate_schemas_1.UpdatePasswordSchema,
        handler: () => { },
    });
    route.post('/register', {
        schema: affiliate_schemas_1.RegisterSchema,
        handler: () => { },
    });
    route.post('/payment/cash', {
        schema: affiliate_schemas_1.CreateCashDisbursedSchema,
        handler: () => { },
    });
    route.post('/payment/transfer', {
        schema: affiliate_schemas_1.CreateTransferDisbursedSchema,
        handler: () => { },
    });
    route.post('/profile/avatar', {
        schema: affiliate_schemas_1.UpdateDisplayPictureSchema,
        handler: () => { },
    });
    route.post('/data-verification', {
        schema: affiliate_schemas_1.DataVerificationSchema,
        handler: () => { },
    });
});
exports.affiliateRoutes = affiliateRoutes;
