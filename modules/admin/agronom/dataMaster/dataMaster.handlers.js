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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAgronomHandler = exports.ListAgronomsHandler = void 0;
const operator_1 = __importDefault(require("../../../../lib/operator"));
const dataMaster_services_1 = require("./dataMaster.services");
const ListAgronomsHandler = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const agronoms = yield (0, dataMaster_services_1.getAllAgronoms)(reply);
    return reply.send(agronoms);
});
exports.ListAgronomsHandler = ListAgronomsHandler;
const CreateAgronomHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = request.body, { mobile, description, specialistId } = _a, data = __rest(_a, ["mobile", "description", "specialistId"]);
    const isMobileValid = (0, operator_1.default)().test(mobile);
    if (!isMobileValid)
        return reply.code(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: 'body/mobile must match format "mobile"',
            code: 'ERR_INVALID_MOBILE',
        });
    const existingSpecialist = yield (0, dataMaster_services_1.getSpecialistById)(reply, specialistId);
    if (!existingSpecialist)
        return reply.badRequest('Specialist is not exists');
    yield (0, dataMaster_services_1.createAgronom)(reply, Object.assign(Object.assign({}, data), { mobile, passwordHash: mobile, description: !description ? undefined : description, specialistId }));
    return reply.code(204).send(undefined);
});
exports.CreateAgronomHandler = CreateAgronomHandler;
