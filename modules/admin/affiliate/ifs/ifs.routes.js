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
exports.ifsRoutes = void 0;
const ifs_schemas_1 = require("./ifs.schemas");
const ifsRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/', {
        schema: ifs_schemas_1.ListIFSSchema,
        handler: () => { },
    });
    route.post('/register', {
        schema: ifs_schemas_1.RegisterIFSSchema,
        handler: () => { },
        bodyLimit: 10 * 1024 * 1024,
    });
});
exports.ifsRoutes = ifsRoutes;
