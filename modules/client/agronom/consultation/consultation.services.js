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
exports.getAgronomById = exports.createConsultationMessage = exports.createConsultation = exports.getConsultationByUserIdAgronomId = exports.getAllConsultationMessages = exports.getConsultationById = exports.getAllConsultations = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const utils_1 = require("../../../../utils");
function getAllConsultations(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.$queryRaw `
    SELECT uc.id, a.name AS name, a."profileUrl",
    (
      SELECT COUNT(ucm.id) as "unreadCount"
      FROM ortani."UserConsultationMessage" ucm
      WHERE ucm."consultationId" = uc.id AND ucm."userId" IS NOT NULL AND ucm."agronomId" IS NULL AND ucm."readAt" IS NULL
    ),
    (
      SELECT CASE
        WHEN (
          SELECT COALESCE(
            (
              SELECT ucm."createdAt"
              FROM ortani."UserConsultationMessage" ucm
              WHERE ucm."consultationId" = uc.id AND ucm."userId" IS NOT NULL AND ucm."agronomId" IS NULL
              ORDER BY ucm."createdAt" DESC
              LIMIT 1
            ),
            '1970-01-01T00:00:00.000Z'::timestamp with time zone
          )
        ) > (
          SELECT COALESCE(
            (
              SELECT ucm."createdAt"
              FROM ortani."UserConsultationMessage" ucm
              WHERE ucm."consultationId" = uc.id AND ucm."userId" IS NULL AND ucm."agronomId" IS NOT NULL
              ORDER BY ucm."createdAt" DESC
              LIMIT 1
            ),
            '1970-01-01T00:00:00.000Z'::timestamp with time zone
          )
        ) THEN (
          SELECT ucm.type::text as type
          FROM ortani."UserConsultationMessage" ucm
          WHERE ucm."consultationId" = uc.id AND ucm."userId" IS NOT NULL AND ucm."agronomId" IS NULL
          ORDER BY ucm."createdAt" DESC
          LIMIT 1
        ) ELSE (
          SELECT ucm.type::text as type
          FROM ortani."UserConsultationMessage" ucm
          WHERE ucm."consultationId" = uc.id AND ucm."userId" IS NULL AND ucm."agronomId" IS NOT NULL
          ORDER BY ucm."createdAt" DESC
          LIMIT 1
        ) END
    ),
    (
      SELECT CASE
        WHEN (
          SELECT COALESCE(
            (
              SELECT ucm."createdAt"
              FROM ortani."UserConsultationMessage" ucm
              WHERE ucm."consultationId" = uc.id AND ucm."userId" IS NOT NULL AND ucm."agronomId" IS NULL
              ORDER BY ucm."createdAt" DESC
              LIMIT 1
            ),
            '1970-01-01T00:00:00.000Z'::timestamp with time zone
          )
        ) > (
          SELECT COALESCE(
            (
              SELECT ucm."createdAt"
              FROM ortani."UserConsultationMessage" ucm
              WHERE ucm."consultationId" = uc.id AND ucm."userId" IS NULL AND ucm."agronomId" IS NOT NULL
              ORDER BY ucm."createdAt" DESC
              LIMIT 1
            ),
            '1970-01-01T00:00:00.000Z'::timestamp with time zone
          )
        ) THEN (
          SELECT ucm.content AS "lastMessage"
          FROM ortani."UserConsultationMessage" ucm
          WHERE ucm."consultationId" = uc.id AND ucm."userId" IS NOT NULL AND ucm."agronomId" IS NULL
          ORDER BY ucm."createdAt" DESC
          LIMIT 1
        ) ELSE (
          SELECT ucm.content AS "lastMessage"
          FROM ortani."UserConsultationMessage" ucm
          WHERE ucm."consultationId" = uc.id AND ucm."userId" IS NULL AND ucm."agronomId" IS NOT NULL
          ORDER BY ucm."createdAt" DESC
          LIMIT 1
        ) END
    ),
    (
      SELECT CASE
        WHEN (
          SELECT COALESCE(
            (
              SELECT ucm."createdAt"
              FROM ortani."UserConsultationMessage" ucm
              WHERE ucm."consultationId" = uc.id AND ucm."userId" IS NOT NULL AND ucm."agronomId" IS NULL
              ORDER BY ucm."createdAt" DESC
              LIMIT 1
            ),
            '1970-01-01T00:00:00.000Z'::timestamp with time zone
          )
        ) > (
          SELECT COALESCE(
            (
              SELECT ucm."createdAt"
              FROM ortani."UserConsultationMessage" ucm
              WHERE ucm."consultationId" = uc.id AND ucm."userId" IS NULL AND ucm."agronomId" IS NOT NULL
              ORDER BY ucm."createdAt" DESC
              LIMIT 1
            ),
            '1970-01-01T00:00:00.000Z'::timestamp with time zone
          )
        ) THEN (
          SELECT ucm."createdAt" AS "lastMessageTime"
          FROM ortani."UserConsultationMessage" ucm
          WHERE ucm."consultationId" = uc.id AND ucm."userId" IS NOT NULL AND ucm."agronomId" IS NULL
          ORDER BY ucm."createdAt" DESC
          LIMIT 1
        ) ELSE (
          SELECT ucm."createdAt" AS "lastMessageTime"
          FROM ortani."UserConsultationMessage" ucm
          WHERE ucm."consultationId" = uc.id AND ucm."userId" IS NULL AND ucm."agronomId" IS NOT NULL
          ORDER BY ucm."createdAt" DESC
          LIMIT 1
        ) END
    )
    FROM ortani."UserConsultation" uc
    LEFT JOIN ortani."Agronom" a ON uc."agronomId" = a.id
    WHERE uc."userId" = ${userId}
    ORDER BY "lastMessageTime" DESC
  `.then((consultations) => consultations.map((_a) => {
            var { lastMessageTime } = _a, consultation = __rest(_a, ["lastMessageTime"]);
            return (Object.assign(Object.assign({}, consultation), { lastMessageTime: lastMessageTime.getTime() }));
        })), reply);
    });
}
exports.getAllConsultations = getAllConsultations;
function getConsultationById(reply, id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userConsultation.findUnique({
            where: { id, userId },
            select: {
                id: true,
                userId: true,
                agronom: { select: { name: true, profileUrl: true } },
            },
        }), reply);
    });
}
exports.getConsultationById = getConsultationById;
function getAllConsultationMessages(reply, consultationId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userConsultationMessage
            .findMany({
            where: {
                consultationId,
                OR: [
                    { AND: [{ userId: null }, { NOT: [{ agronomId: null }] }] },
                    { AND: [{ NOT: [{ userId: null }] }, { agronomId: null }] },
                ],
            },
            orderBy: { createdAt: 'asc' },
        })
            .then((messages) => messages.reduce((prev, _a) => {
            var { userId, agronomId, readAt, createdAt } = _a, message = __rest(_a, ["userId", "agronomId", "readAt", "createdAt"]);
            if (userId) {
                if (agronomId)
                    return prev;
                return [
                    ...prev,
                    Object.assign(Object.assign({}, message), { senderId: userId, agronom: false, readAt: readAt ? readAt.getTime() : null, createdAt: createdAt.getTime() }),
                ];
            }
            if (agronomId) {
                if (userId)
                    return prev;
                return [
                    ...prev,
                    Object.assign(Object.assign({}, message), { senderId: agronomId, agronom: true, readAt: readAt ? readAt.getTime() : null, createdAt: createdAt.getTime() }),
                ];
            }
            return prev;
        }, [])), reply);
    });
}
exports.getAllConsultationMessages = getAllConsultationMessages;
function getConsultationByUserIdAgronomId(reply, userId_agronomId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userConsultation.findUnique({
            where: { userId_agronomId },
            select: { id: true },
        }), reply);
    });
}
exports.getConsultationByUserIdAgronomId = getConsultationByUserIdAgronomId;
function createConsultation(reply, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userConsultation
            .create({ data, select: { id: true } })
            .then(({ id }) => id), reply);
    });
}
exports.createConsultation = createConsultation;
function createConsultationMessage(reply, userId, consultationId, message) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userConsultationMessage.create({
            data: {
                userId,
                consultationId,
                type: 'text',
                content: message,
            },
            select: { id: true, createdAt: true },
        }), reply);
    });
}
exports.createConsultationMessage = createConsultationMessage;
function getAgronomById(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronom.findUnique({ where: { id } }), reply);
    });
}
exports.getAgronomById = getAgronomById;
