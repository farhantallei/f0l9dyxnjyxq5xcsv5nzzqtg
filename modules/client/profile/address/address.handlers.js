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
exports.ListVillagesHandler = exports.ListDistrictsHandler = exports.ListRegenciesHandler = exports.ListProvincesHandler = exports.DeleteAddressHandler = exports.UpdateAddressHandler = exports.AddAddressHandler = exports.GetAddressHandler = exports.ListAddressesHandler = void 0;
const operator_1 = __importDefault(require("../../../../lib/operator"));
const address_services_1 = require("./address.services");
const ListAddressesHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.userId;
    const address = yield (0, address_services_1.getAllAddresses)(reply, userId);
    return reply.send(address);
});
exports.ListAddressesHandler = ListAddressesHandler;
const GetAddressHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { addressId } = request.params;
    const userId = request.userId;
    const address = yield (0, address_services_1.getAddressDetailsById)(reply, { addressId, userId });
    if (!address)
        return reply.notFound('Address is not found');
    return reply.send(address);
});
exports.GetAddressHandler = GetAddressHandler;
const AddAddressHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = request.body, { main } = _a, data = __rest(_a, ["main"]);
    const userId = request.userId;
    const isMobileValid = (0, operator_1.default)().test(data.mobile);
    if (!isMobileValid)
        return reply.badRequest('body/mobile must match format "mobile"');
    const addressCount = yield (0, address_services_1.countAddresses)(reply, userId);
    if (addressCount < 1 && !main)
        return reply.badRequest('The first address should be the main address');
    if (addressCount > 0 && main)
        yield (0, address_services_1.toggleOffMainAddresses)(reply, userId);
    yield (0, address_services_1.createAddress)(reply, userId, Object.assign(Object.assign({}, data), { main }));
    return reply.code(204).send(undefined);
});
exports.AddAddressHandler = AddAddressHandler;
const UpdateAddressHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { addressId } = request.params;
    const data = request.body;
    const userId = request.userId;
    const existingAddress = yield (0, address_services_1.getAddressById)(reply, { addressId, userId });
    if (!existingAddress)
        return reply.notFound('Address is not found');
    if (!data.main && existingAddress.main)
        return reply.forbidden('Cannot toggle off the main address');
    if (data.main)
        yield (0, address_services_1.toggleOffMainAddresses)(reply, userId);
    yield (0, address_services_1.updateAddress)(reply, addressId, data);
    return reply.code(204).send(undefined);
});
exports.UpdateAddressHandler = UpdateAddressHandler;
const DeleteAddressHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { addressId } = request.params;
    const userId = request.userId;
    const existingAddress = yield (0, address_services_1.getAddressById)(reply, { addressId, userId });
    if (!existingAddress)
        return reply.notFound('Address is not found');
    if (existingAddress.main)
        return reply.forbidden('Cannot delete the main address');
    yield (0, address_services_1.deleteAddress)(reply, addressId);
    return reply.code(204).send(undefined);
});
exports.DeleteAddressHandler = DeleteAddressHandler;
const ListProvincesHandler = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const provinces = yield (0, address_services_1.getAllProvinces)(reply);
    return reply.send(provinces);
});
exports.ListProvincesHandler = ListProvincesHandler;
const ListRegenciesHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.params;
    const regencies = yield (0, address_services_1.getAllRegencies)(reply, data);
    return reply.send(regencies);
});
exports.ListRegenciesHandler = ListRegenciesHandler;
const ListDistrictsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.params;
    const districts = yield (0, address_services_1.getAllDistricts)(reply, data);
    return reply.send(districts);
});
exports.ListDistrictsHandler = ListDistrictsHandler;
const ListVillagesHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.params;
    const villages = yield (0, address_services_1.getAllVillages)(reply, data);
    return reply.send(villages);
});
exports.ListVillagesHandler = ListVillagesHandler;
