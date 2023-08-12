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
exports.agronomRoutes = void 0;
const agronom_schemas_1 = require("./agronom.schemas");
const agronom_handlers_1 = require("./agronom.handlers");
const agronomRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/specialist', {
        schema: agronom_schemas_1.ListAgronomSpecialistsSchema,
        handler: agronom_handlers_1.ListAgronomSpecialistsHandler,
    });
    route.post('/', {
        schema: agronom_schemas_1.CreateAgronomSchema,
        handler: agronom_handlers_1.CreateAgronomHandler,
    });
    route.post('/specialist', {
        schema: agronom_schemas_1.CreateAgronomSpecialistSchema,
        handler: agronom_handlers_1.CreateAgronomSpecialistHandler,
    });
});
exports.agronomRoutes = agronomRoutes;
