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
exports.notificationRoutes = void 0;
const notification_handlers_1 = require("./notification.handlers");
const notification_schemas_1 = require("./notification.schemas");
const notificationRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/purchase', {
        schema: notification_schemas_1.ListPurchaseNotificationsSchema,
        handler: notification_handlers_1.ListPurchaseNotificationsHandler,
    });
    route.get('/sales', {
        schema: notification_schemas_1.ListSalesNotificationsSchema,
        handler: notification_handlers_1.ListSalesNotificationsHandler,
    });
    route.get('/other', {
        schema: notification_schemas_1.ListOtherNotificationsSchema,
        handler: notification_handlers_1.ListOtherNotificationsHandler,
    });
});
exports.notificationRoutes = notificationRoutes;
