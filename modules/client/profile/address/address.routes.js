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
exports.addressRoutes = void 0;
const address_handlers_1 = require("./address.handlers");
const address_schemas_1 = require("./address.schemas");
const addressRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/', {
        schema: address_schemas_1.ListAddressesSchema,
        handler: address_handlers_1.ListAddressesHandler,
    });
    route.get('/province', {
        schema: address_schemas_1.ListProvincesSchema,
        handler: address_handlers_1.ListProvincesHandler,
    });
    route.get('/province/:provinceId/regency', {
        schema: address_schemas_1.ListRegenciesSchema,
        handler: address_handlers_1.ListRegenciesHandler,
    });
    route.get('/province/:provinceId/regency/:regencyId/district', {
        schema: address_schemas_1.ListDistrictsSchema,
        handler: address_handlers_1.ListDistrictsHandler,
    });
    route.get('/province/:provinceId/regency/:regencyId/district/:districtId/village', {
        schema: address_schemas_1.ListVillagesSchema,
        handler: address_handlers_1.ListVillagesHandler,
    });
    route.get('/:addressId', {
        schema: address_schemas_1.GetAddressSchema,
        handler: address_handlers_1.GetAddressHandler,
    });
    route.post('/', {
        schema: address_schemas_1.AddAddressSchema,
        handler: address_handlers_1.AddAddressHandler,
    });
    route.put('/:addressId', {
        schema: address_schemas_1.UpdateAddressSchema,
        handler: address_handlers_1.UpdateAddressHandler,
    });
    route.delete('/:addressId', {
        schema: address_schemas_1.DeleteAddressSchema,
        handler: address_handlers_1.DeleteAddressHandler,
    });
});
exports.addressRoutes = addressRoutes;
