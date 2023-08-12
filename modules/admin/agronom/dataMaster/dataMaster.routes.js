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
exports.dataMasterRoutes = void 0;
const dataMaster_handlers_1 = require("./dataMaster.handlers");
const dataMaster_schemas_1 = require("./dataMaster.schemas");
const dataMasterRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/list', {
        schema: dataMaster_schemas_1.ListAgronomsSchema,
        handler: dataMaster_handlers_1.ListAgronomsHandler,
    });
    route.post('/new', {
        schema: dataMaster_schemas_1.CreateAgronomSchema,
        handler: dataMaster_handlers_1.CreateAgronomHandler,
    });
});
exports.dataMasterRoutes = dataMasterRoutes;
