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
exports.GetProfileHandler = void 0;
const profile_services_1 = require("./profile.services");
const GetProfileHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const agronomId = request.agronomId;
    const agronom = yield (0, profile_services_1.getAgronomById)(reply, agronomId);
    if (!agronom)
        return reply.notFound('Agronom is not found');
    return reply.send(agronom);
});
exports.GetProfileHandler = GetProfileHandler;
