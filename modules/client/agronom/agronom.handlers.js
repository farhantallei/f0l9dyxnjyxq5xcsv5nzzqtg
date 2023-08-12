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
exports.RateAgronomHandler = exports.CreateAgronomAppointmentHandler = exports.GetAgronomDetailsHandler = exports.ListAgronomsHandler = exports.GetHomeHandler = void 0;
const agronom_services_1 = require("./agronom.services");
const GetHomeHandler = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const banners = yield (0, agronom_services_1.getAllBanners)(reply);
    const agronoms = yield (0, agronom_services_1.getSomeAgronoms)(reply);
    const products = yield (0, agronom_services_1.getSomeProducts)(reply);
    return reply.send({
        banners,
        agronoms,
        products,
    });
});
exports.GetHomeHandler = GetHomeHandler;
const ListAgronomsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchQuery } = request.query;
    const agronoms = yield (0, agronom_services_1.getAllAgronoms)(reply, searchQuery);
    return reply.send(agronoms);
});
exports.ListAgronomsHandler = ListAgronomsHandler;
const GetAgronomDetailsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { agronomId } = request.params;
    const agronom = yield (0, agronom_services_1.getAgronomById)(reply, agronomId);
    if (!agronom)
        return reply.notFound('Agronom is not found');
    const agronoms = yield (0, agronom_services_1.getSomeAgronoms)(reply, agronomId);
    return reply.send(Object.assign(Object.assign({}, agronom), { meta: { agronoms } }));
});
exports.GetAgronomDetailsHandler = GetAgronomDetailsHandler;
const CreateAgronomAppointmentHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { agronomId } = request.params;
    const { time } = request.body;
    const userId = request.userId;
    yield (0, agronom_services_1.createAppointment)(reply, { agronomId, userId, time });
    return reply.code(204).send(undefined);
});
exports.CreateAgronomAppointmentHandler = CreateAgronomAppointmentHandler;
const RateAgronomHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { agronomId } = request.params;
    const { like } = request.body;
    const userId = request.userId;
    yield (0, agronom_services_1.rateAgronom)(reply, { userId, agronomId, like });
    return reply.code(204).send(undefined);
});
exports.RateAgronomHandler = RateAgronomHandler;
