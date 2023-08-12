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
exports.ListCompleteHandler = exports.ListRefusedHandler = exports.ListBoughtHandler = exports.ListProductSubmissionHandler = void 0;
const purchase_services_1 = require("./purchase.services");
const ListProductSubmissionHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const outletId = request.outletId;
    const orders = yield (0, purchase_services_1.getAllProductSubmission)(reply, outletId);
    return reply.send(orders);
});
exports.ListProductSubmissionHandler = ListProductSubmissionHandler;
const ListBoughtHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const outletId = request.outletId;
    const orders = yield (0, purchase_services_1.getAllBought)(reply, outletId);
    return reply.send(orders);
});
exports.ListBoughtHandler = ListBoughtHandler;
const ListRefusedHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const outletId = request.outletId;
    const orders = yield (0, purchase_services_1.getAllRefused)(reply, outletId);
    return reply.send(orders);
});
exports.ListRefusedHandler = ListRefusedHandler;
const ListCompleteHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const outletId = request.outletId;
    const orders = yield (0, purchase_services_1.getAllComplete)(reply, outletId);
    return reply.send(orders);
});
exports.ListCompleteHandler = ListCompleteHandler;
