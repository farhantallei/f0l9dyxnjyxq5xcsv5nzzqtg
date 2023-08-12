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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSpecialists = exports.createSpecialist = exports.getSpecialistByName = exports.createAgronom = exports.getAgronomByMobile = exports.getAgronomByEmail = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const utils_1 = require("../../../../utils");
function getAgronomByEmail(reply, email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronom.findUnique({ where: { email } }), reply);
    });
}
exports.getAgronomByEmail = getAgronomByEmail;
function getAgronomByMobile(reply, mobile) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronom.findUnique({ where: { mobile } }), reply);
    });
}
exports.getAgronomByMobile = getAgronomByMobile;
function createAgronom(reply, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronom.create({ data }), reply);
    });
}
exports.createAgronom = createAgronom;
function getSpecialistByName(reply, specialist) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronomSpecialist.findUnique({ where: { specialist } }), reply);
    });
}
exports.getSpecialistByName = getSpecialistByName;
function createSpecialist(reply, specialist) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronomSpecialist.create({
            data: { specialist },
        }), reply);
    });
}
exports.createSpecialist = createSpecialist;
function getAllSpecialists(reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronomSpecialist.findMany(), reply);
    });
}
exports.getAllSpecialists = getAllSpecialists;
