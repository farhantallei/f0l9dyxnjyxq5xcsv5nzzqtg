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
exports.GetHomeHandler = void 0;
const ecommerce_services_1 = require("./ecommerce.services");
const GetHomeHandler = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const banners = yield (0, ecommerce_services_1.getAllBanners)(reply);
    const promotionSchedule = yield (0, ecommerce_services_1.getPromotionSchedule)(reply);
    if (!promotionSchedule)
        return reply.notFound('Schedule is not found');
});
exports.GetHomeHandler = GetHomeHandler;
