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
exports.getAllVillages = exports.getAllDistricts = exports.getAllRegencies = exports.getAllProvinces = exports.countAddresses = exports.deleteAddress = exports.updateAddress = exports.createAddress = exports.toggleOffMainAddresses = exports.getAddressDetailsById = exports.getAddressById = exports.getAllAddresses = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const utils_1 = require("../../../../utils");
function getAllAddresses(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userAddress
            .findMany({
            where: { userId },
            select: {
                id: true,
                name: true,
                mobile: true,
                address: true,
                province: true,
                regency: true,
                district: true,
                village: true,
                main: true,
            },
        })
            .then((addresses) => addresses.map((_a) => {
            var { province, regency, district, village } = _a, rest = __rest(_a, ["province", "regency", "district", "village"]);
            return (Object.assign(Object.assign({}, rest), { region: `${village.name}, ${district.name}, ${regency.name}, ${province.name}` }));
        })), reply);
    });
}
exports.getAllAddresses = getAllAddresses;
function getAddressById(reply, { addressId, userId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userAddress.findUnique({ where: { id: addressId, userId } }), reply);
    });
}
exports.getAddressById = getAddressById;
function getAddressDetailsById(reply, { addressId, userId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userAddress.findUnique({
            where: { id: addressId, userId },
            include: { province: true, regency: true, district: true, village: true },
        }), reply);
    });
}
exports.getAddressDetailsById = getAddressDetailsById;
function toggleOffMainAddresses(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userAddress.updateMany({
            where: { userId },
            data: { main: false },
        }), reply);
    });
}
exports.toggleOffMainAddresses = toggleOffMainAddresses;
function createAddress(reply, userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userAddress.create({
            data: Object.assign(Object.assign({}, data), { userId }),
        }), reply);
    });
}
exports.createAddress = createAddress;
function updateAddress(reply, id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userAddress.update({ where: { id }, data }), reply);
    });
}
exports.updateAddress = updateAddress;
function deleteAddress(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userAddress.delete({ where: { id } }), reply);
    });
}
exports.deleteAddress = deleteAddress;
function countAddresses(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userAddress.count({ where: { userId } }), reply);
    });
}
exports.countAddresses = countAddresses;
function getAllProvinces(reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.province.findMany(), reply);
    });
}
exports.getAllProvinces = getAllProvinces;
function getAllRegencies(reply, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.regency.findMany({
            where: data,
            select: { regencyId: true, name: true },
        }), reply);
    });
}
exports.getAllRegencies = getAllRegencies;
function getAllDistricts(reply, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.district.findMany({
            where: data,
            select: { districtId: true, name: true },
        }), reply);
    });
}
exports.getAllDistricts = getAllDistricts;
function getAllVillages(reply, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.village.findMany({
            where: data,
            select: { villageId: true, name: true },
        }), reply);
    });
}
exports.getAllVillages = getAllVillages;
