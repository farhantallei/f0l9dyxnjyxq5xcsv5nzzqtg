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
exports.countUnreadMessages = exports.getInboxById = exports.getAllAdminMessages = exports.getAllUserMessages = exports.getAllInboxes = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const utils_1 = require("../../../../utils");
function getAllInboxes(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.$queryRaw `
      SELECT ui.id, o.name AS outlet, o."profileUrl",
      (
        SELECT COUNT(am.id) as "unreadCount"
        FROM "AdminMessage" am
        WHERE am."inboxId" = ui.id AND am."readAt" IS NULL
      ),
      (
        SELECT CASE
          WHEN (
            SELECT um."createdAt"
            FROM ortani."UserMessage" um
            WHERE um."inboxId" = ui.id
            ORDER BY um."createdAt" DESC
            LIMIT 1
          ) > (
            SELECT am."createdAt"
            FROM ortani."AdminMessage" am
            WHERE am."inboxId" = ui.id
            ORDER BY am."createdAt" DESC
            LIMIT 1
          ) THEN (
            SELECT um.type::text as type
            FROM ortani."UserMessage" um
            WHERE um."inboxId" = ui.id
            ORDER BY um."createdAt" DESC
            LIMIT 1
          ) ELSE (
            SELECT am.type::text as type
            FROM ortani."AdminMessage" am
            WHERE am."inboxId" = ui.id
            ORDER BY am."createdAt" DESC
            LIMIT 1
          ) END
      ),
      (
        SELECT CASE
          WHEN (
            SELECT um."createdAt"
            FROM "UserMessage" um
            WHERE um."inboxId" = ui.id
            ORDER BY um."createdAt" DESC
            LIMIT 1
          ) > (
            SELECT am."createdAt"
            FROM "AdminMessage" am
            WHERE am."inboxId" = ui.id
            ORDER BY am."createdAt" DESC
            LIMIT 1
          ) THEN (
            SELECT umc.content AS "lastMessage"
            FROM "UserMessage" um
            LEFT JOIN "UserMessageContent" umc ON um.id = umc."messageId"
            WHERE um."inboxId" = ui.id
            ORDER BY um."createdAt" DESC
            LIMIT 1
          ) ELSE (
            SELECT amc.content AS "lastMessage"
            FROM "AdminMessage" am
            LEFT JOIN "AdminMessageContent" amc ON am.id = amc."messageId"
            WHERE am."inboxId" = ui.id
            ORDER BY am."createdAt" DESC
            LIMIT 1
          ) END
      ),
      (
        SELECT CASE
          WHEN (
            SELECT um."createdAt"
            FROM "UserMessage" um
            WHERE um."inboxId" = ui.id
            ORDER BY um."createdAt" DESC
            LIMIT 1
          ) > (
            SELECT am."createdAt"
            FROM "AdminMessage" am
            WHERE am."inboxId" = ui.id
            ORDER BY am."createdAt" DESC
            LIMIT 1
          ) THEN (
            SELECT um."createdAt" AS "lastMessageTime"
            FROM "UserMessage" um
            LEFT JOIN "UserMessageContent" umc ON um.id = umc."messageId"
            WHERE um."inboxId" = ui.id
            ORDER BY um."createdAt" DESC
            LIMIT 1
          ) ELSE (
            SELECT am."createdAt" AS "lastMessageTime"
            FROM "AdminMessage" am
            LEFT JOIN "AdminMessageContent" amc ON am.id = amc."messageId"
            WHERE am."inboxId" = ui.id
            ORDER BY am."createdAt" DESC
            LIMIT 1
          ) END
      )
      FROM "UserInbox" ui
      LEFT JOIN "Outlet" o ON ui."outletId" = o.id
      WHERE ui."userId" = ${userId}
      ORDER BY "lastMessageTime" DESC
    `.then((inboxes) => inboxes.map((_a) => {
            var { lastMessageTime } = _a, inbox = __rest(_a, ["lastMessageTime"]);
            return (Object.assign(Object.assign({}, inbox), { lastMessageTime: lastMessageTime.getTime() }));
        })), reply);
    });
}
exports.getAllInboxes = getAllInboxes;
function getAllUserMessages(reply, inboxId) {
    return __awaiter(this, void 0, void 0, function* () {
        function setContent(type, data) {
            const contentObj = {
                text: data.content ? { text: data.content.content } : null,
                image: data.content ? { url: data.content.content } : null,
                bid: data.bid
                    ? {
                        id: data.bid.productId,
                        product: data.bid.product.name,
                        price: data.bid.price.toNumber(),
                        accepted: data.bid.accepted,
                    }
                    : null,
                product: data.product
                    ? {
                        id: data.product.productId,
                        product: data.product.product.name,
                        price: data.product.product.price.toNumber(),
                        text: data.product.text,
                    }
                    : null,
            };
            return contentObj[type];
        }
        return yield (0, utils_1.commitToDB)(prisma_1.default.userMessage
            .findMany({
            where: { inboxId },
            include: {
                content: { select: { content: true } },
                bid: {
                    select: {
                        productId: true,
                        price: true,
                        accepted: true,
                        product: { select: { name: true } },
                    },
                },
                product: {
                    select: {
                        productId: true,
                        text: true,
                        product: { select: { name: true, price: true } },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        })
            .then((messages) => messages.map(({ id, userId, type, content, bid, product, readAt, createdAt }) => ({
            id,
            senderId: userId,
            admin: false,
            type,
            content: setContent(type, { content, bid, product }),
            readAt: readAt ? readAt.getTime() : null,
            createdAt: createdAt.getTime(),
        }))), reply);
    });
}
exports.getAllUserMessages = getAllUserMessages;
function getAllAdminMessages(reply, inboxId) {
    return __awaiter(this, void 0, void 0, function* () {
        function setContent(type, data) {
            const contentObj = {
                text: data.content ? { text: data.content.content } : null,
                image: data.content ? { url: data.content.content } : null,
                bid: data.bid
                    ? {
                        id: data.bid.productId,
                        product: data.bid.product.name,
                        price: data.bid.price.toNumber(),
                        accepted: data.bid.accepted,
                    }
                    : null,
            };
            return contentObj[type];
        }
        return yield (0, utils_1.commitToDB)(prisma_1.default.adminMessage
            .findMany({
            where: { inboxId },
            include: {
                content: { select: { content: true } },
                bid: {
                    select: {
                        productId: true,
                        price: true,
                        accepted: true,
                        product: { select: { name: true } },
                    },
                },
            },
        })
            .then((messages) => messages.map(({ id, adminId, type, content, bid, readAt, createdAt }) => ({
            id,
            senderId: adminId,
            admin: true,
            type,
            content: setContent(type, { content, bid }),
            readAt: readAt ? readAt.getTime() : null,
            createdAt: createdAt.getTime(),
        }))), reply);
    });
}
exports.getAllAdminMessages = getAllAdminMessages;
function getInboxById(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userInbox.findUnique({
            where: { id },
            select: {
                id: true,
                userId: true,
                outlet: { select: { name: true, profileUrl: true } },
            },
        }), reply);
    });
}
exports.getInboxById = getInboxById;
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
