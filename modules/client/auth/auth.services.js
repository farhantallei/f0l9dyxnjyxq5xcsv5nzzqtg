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
exports.deleteUserSessionById = exports.countUnreadMessages = exports.countCartProducts = exports.countSalesNotifications = exports.countPurchaseNotifications = exports.activateAccount = exports.getUserSessionById = exports.getUserByMobile = exports.getUserByEmail = exports.getUserById = exports.updateLastLoggedIn = exports.updateLastActivity = exports.updateUser = exports.updateUserStatus = exports.updateUserPassword = exports.createUserSession = exports.createUser = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const utils_1 = require("../../../utils");
function createUser(reply, _a) {
    var { active = false } = _a, data = __rest(_a, ["active"]);
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.user.create({
            data: Object.assign(Object.assign({}, data), { status: active ? 'active' : 'non_active' }),
        }), reply);
    });
}
exports.createUser = createUser;
function createUserSession(reply, userId, secret, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userSession.create({ data: Object.assign({ userId, secret }, data) }), reply);
    });
}
exports.createUserSession = createUserSession;
function updateUserPassword(reply, id, passwordHash) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.user.update({ where: { id }, data: { passwordHash } }), reply);
    });
}
exports.updateUserPassword = updateUserPassword;
function updateUserStatus(reply, id, status) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.user.update({ where: { id }, data: { status } }), reply);
    });
}
exports.updateUserStatus = updateUserStatus;
function updateUser(reply, id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.user.update({ where: { id }, data }), reply);
    });
}
exports.updateUser = updateUser;
function updateLastActivity(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userSession.update({
            where: { id },
            data: { lastActivity: new Date() },
        }), reply);
    });
}
exports.updateLastActivity = updateLastActivity;
function updateLastLoggedIn(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userSession.update({
            where: { id },
            data: { lastLoggedIn: new Date() },
        }), reply);
    });
}
exports.updateLastLoggedIn = updateLastLoggedIn;
function getUserById(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.user.findUnique({ where: { id } }), reply);
    });
}
exports.getUserById = getUserById;
function getUserByEmail(reply, email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.user.findUnique({ where: { email } }), reply);
    });
}
exports.getUserByEmail = getUserByEmail;
function getUserByMobile(reply, mobile) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.user.findUnique({ where: { mobile } }), reply);
    });
}
exports.getUserByMobile = getUserByMobile;
function getUserSessionById(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userSession.findUnique({ where: { id } }), reply);
    });
}
exports.getUserSessionById = getUserSessionById;
function activateAccount(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.user.update({ where: { id }, data: { status: 'active' } }), reply);
    });
}
exports.activateAccount = activateAccount;
function countPurchaseNotifications(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productOrderNotification.count({ where: { userId } }), reply);
    });
}
exports.countPurchaseNotifications = countPurchaseNotifications;
function countSalesNotifications(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userProductNotification.count({ where: { userId } }), reply);
    });
}
exports.countSalesNotifications = countSalesNotifications;
function countCartProducts(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productCartsOnUsers.count({ where: { userId } }), reply);
    });
}
exports.countCartProducts = countCartProducts;
function countUnreadMessages(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.$queryRaw `
      SELECT COUNT(am.id)
      FROM "UserInbox" ui
      LEFT JOIN "AdminMessage" am ON ui.id = am."inboxId" AND am."readAt" IS NULL
      WHERE ui."userId" = ${userId}
    `.then((res) => res[0].count), reply);
    });
}
exports.countUnreadMessages = countUnreadMessages;
function deleteUserSessionById(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userSession.delete({ where: { id } }), reply);
    });
}
exports.deleteUserSessionById = deleteUserSessionById;
