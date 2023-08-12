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
const home_services_1 = require("./home.services");
const GetHomeHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const agronomId = request.agronomId;
    const banners = yield (0, home_services_1.getAllBanners)(reply);
    const requestedAppointments = yield (0, home_services_1.getSomeRequestedAppointments)(reply, agronomId);
    const lastAppointments = yield (0, home_services_1.getSomeCompletedAppointments)(reply, agronomId);
    return reply.send({ banners, requestedAppointments, lastAppointments });
});
exports.GetHomeHandler = GetHomeHandler;
