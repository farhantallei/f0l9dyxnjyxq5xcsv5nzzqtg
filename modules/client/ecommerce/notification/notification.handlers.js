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
exports.ListOtherNotificationsHandler = exports.ListSalesNotificationsHandler = exports.ListPurchaseNotificationsHandler = void 0;
const notification_services_1 = require("./notification.services");
const ListPurchaseNotificationsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.userId;
    const purchaseNotifications = yield (0, notification_services_1.getAllPurchaseNotifications)(reply, userId);
    return reply.send(purchaseNotifications);
});
exports.ListPurchaseNotificationsHandler = ListPurchaseNotificationsHandler;
const ListSalesNotificationsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.userId;
    const salesNotifications = yield (0, notification_services_1.getAllSalesNotifications)(reply, userId);
    return reply.send(salesNotifications);
});
exports.ListSalesNotificationsHandler = ListSalesNotificationsHandler;
const ListOtherNotificationsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.userId;
    return reply.send([]);
});
exports.ListOtherNotificationsHandler = ListOtherNotificationsHandler;
