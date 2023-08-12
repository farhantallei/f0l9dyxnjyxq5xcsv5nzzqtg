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
exports.rateAgronom = exports.createAppointment = exports.getAgronomById = exports.getSomeProducts = exports.getSomeAgronoms = exports.getAllAgronoms = exports.getAllBanners = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const utils_1 = require("../../../utils");
function getAllBanners(reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.banner.findMany({
            where: { page: 'client_agronom' },
            select: { id: true, url: true },
        }), reply);
    });
}
exports.getAllBanners = getAllBanners;
function getAllAgronoms(reply, searchQuery) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronom
            .findMany({
            where: {
                specialist: {
                    specialist: { contains: searchQuery, mode: 'insensitive' },
                },
            },
            select: {
                id: true,
                name: true,
                specialist: { select: { specialist: true } },
                experience: true,
                profileUrl: true,
            },
            orderBy: { experience: 'desc' },
        })
            .then((agronom) => agronom.map((_a) => {
            var { specialist: { specialist }, experience } = _a, rest = __rest(_a, ["specialist", "experience"]);
            return (Object.assign(Object.assign({}, rest), { experience: experience.toNumber(), specialist }));
        })), reply);
    });
}
exports.getAllAgronoms = getAllAgronoms;
function getSomeAgronoms(reply, idNot) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronom
            .findMany({
            where: { id: { not: idNot } },
            select: {
                id: true,
                name: true,
                specialist: { select: { specialist: true } },
                experience: true,
                profileUrl: true,
            },
            orderBy: { experience: 'desc' },
            take: 3,
        })
            .then((agronom) => agronom.map((_a) => {
            var { specialist: { specialist }, experience } = _a, rest = __rest(_a, ["specialist", "experience"]);
            return (Object.assign(Object.assign({}, rest), { experience: experience.toNumber(), specialist }));
        })), reply);
    });
}
exports.getSomeAgronoms = getSomeAgronoms;
function getSomeProducts(reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.$queryRaw `
      SELECT p.id, p.name, p.price,
        AVG(pr.rating) AS rating,
        (
          SELECT pi.url
          FROM "ProductImage" pi
          WHERE pi."productId" = p.id ORDER BY pi.sequence
          LIMIT 1
        ) AS "thumbnailUrl",
        (
          SELECT SUM(poi.quantity)
          FROM "ProductOrderItem" poi
          LEFT JOIN "ProductOrder" po ON poi."orderId" = po.id
          WHERE poi."productId" = p.id AND po.status = 'complete'
        ) AS sold
      FROM "Product" p
      LEFT JOIN "ProductReview" pr ON p.id = pr."productId"
      GROUP BY p.id
      ORDER BY sold DESC, p.id ASC
      LIMIT 4`.then((products) => products.map((_a) => {
            var { price, rating, sold } = _a, product = __rest(_a, ["price", "rating", "sold"]);
            return Object.assign(Object.assign({}, product), { price: price.toNumber(), rating: rating ? (0, utils_1.roundDecimals)(Number(rating), 1) : null, sold: sold || 0 });
        })), reply);
    });
}
exports.getSomeProducts = getSomeProducts;
function getAgronomById(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const likes = yield (0, utils_1.commitToDB)(prisma_1.default.agronomLike.findMany({
            where: { agronomId: id },
            select: { like: true },
        }), reply);
        const likeCount = likes.filter((like) => like).length;
        const like = likeCount / likes.length || 0;
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronom
            .findUnique({
            where: { id },
            select: {
                name: true,
                specialist: { select: { specialist: true } },
                university: true,
                experience: true,
                description: true,
                profileUrl: true,
            },
        })
            .then((agronom) => {
            if (!agronom)
                return null;
            const { specialist: { specialist }, experience } = agronom, rest = __rest(agronom, ["specialist", "experience"]);
            return Object.assign({ specialist, experience: experience.toNumber(), like }, rest);
        }), reply);
    });
}
exports.getAgronomById = getAgronomById;
function createAppointment(reply, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronomAppointment.create({ data }), reply);
    });
}
exports.createAppointment = createAppointment;
function rateAgronom(reply, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronomLike.create({ data }), reply);
    });
}
exports.rateAgronom = rateAgronom;
