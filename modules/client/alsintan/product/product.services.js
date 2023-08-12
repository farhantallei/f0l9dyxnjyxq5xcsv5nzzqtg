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
exports.getAllProducts = exports.createProductOrder = exports.countProductReviews = exports.countProducts = exports.getUserAddressById = exports.getProductReviews = exports.getProductDetails = exports.getProductById = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const utils_1 = require("../../../../utils");
const client_1 = require("@prisma/client");
function getProductById(reply, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.alsintan.findUnique({
            where: { id: productId },
            select: { id: true, rentalType: true, price: true },
        }), reply);
    });
}
exports.getProductById = getProductById;
function getProductDetails(reply, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.alsintan
            .findUnique({
            where: { id: productId },
            select: {
                id: true,
                name: true,
                category: { select: { category: true } },
                rentalType: true,
                price: true,
                description: true,
                reviews: {
                    select: {
                        id: true,
                        rating: true,
                        review: true,
                        createdAt: true,
                        images: { select: { id: true, url: true } },
                        user: { select: { name: true, profileUrl: true } },
                    },
                    take: 3,
                    orderBy: { rating: 'desc' },
                },
                images: {
                    select: { id: true, url: true },
                    orderBy: { sequence: 'asc' },
                },
            },
        })
            .then((product) => {
            if (!product)
                return null;
            const category = product.category.category;
            const price = product.price.toNumber();
            const reviews = product.reviews.map((_a) => {
                var { user: { name, profileUrl }, createdAt } = _a, review = __rest(_a, ["user", "createdAt"]);
                return Object.assign(Object.assign({}, review), { name,
                    profileUrl, createdAt: createdAt.getTime() });
            });
            return Object.assign(Object.assign({}, product), { category, price, reviews });
        }), reply);
    });
}
exports.getProductDetails = getProductDetails;
function getProductReviews(reply, productId, { page, limit }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.alsintanReview
            .findMany({
            where: { alsintanId: productId },
            select: {
                id: true,
                rating: true,
                review: true,
                createdAt: true,
                images: { select: { id: true, url: true } },
                user: { select: { name: true, profileUrl: true } },
            },
            orderBy: { rating: 'desc' },
            take: limit,
            skip: (page - 1) * limit,
        })
            .then((reviews) => reviews.map((_a) => {
            var { user: { name, profileUrl }, createdAt } = _a, review = __rest(_a, ["user", "createdAt"]);
            return Object.assign(Object.assign({}, review), { name,
                profileUrl, createdAt: createdAt.getTime() });
        })), reply);
    });
}
exports.getProductReviews = getProductReviews;
function getUserAddressById(reply, { id, userId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.userAddress.findUnique({
            where: { id, userId },
            select: { address: true, name: true, mobile: true },
        }), reply);
    });
}
exports.getUserAddressById = getUserAddressById;
function countProducts(reply, { searchQuery }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.alsintan.count({
            where: { name: { contains: searchQuery, mode: 'insensitive' } },
        }), reply);
    });
}
exports.countProducts = countProducts;
function countProductReviews(reply, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.alsintanReview.count({ where: { alsintanId: productId } }), reply);
    });
}
exports.countProductReviews = countProductReviews;
function createProductOrder(reply, productId, _a) {
    var { from, to, paymentMethod, subtotal, discount, total } = _a, data = __rest(_a, ["from", "to", "paymentMethod", "subtotal", "discount", "total"]);
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
            const order = yield tx.alsintanOrder.create({
                data: Object.assign({ alsintanId: productId, from: new Date(from), to: to ? new Date(to) : undefined }, data),
                select: { id: true, status: true, createdAt: true },
            });
            yield tx.alsintanOrderStatusLog.create({
                data: Object.assign(Object.assign({}, order), { orderId: order.id }),
            });
            const today = new Date();
            const year = today.getFullYear().toString().slice(2);
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            const orderId = order.id.toString().padStart(4, '0');
            yield tx.alsintanInvoice.create({
                data: {
                    orderId: order.id,
                    invoice: `${year}${month}${day}/ALS/${orderId}`,
                    paymentMethod,
                    subtotal,
                    discount,
                    total,
                },
            });
        })), reply);
    });
}
exports.createProductOrder = createProductOrder;
function getAllProducts(reply, { page, limit }, { searchQuery }) {
    return __awaiter(this, void 0, void 0, function* () {
        function setFilter() {
            if (searchQuery)
                return client_1.Prisma.sql `WHERE als."name" ILIKE ${'%' + searchQuery + '%'}`;
            return client_1.Prisma.empty;
        }
        const filter = setFilter();
        return yield (0, utils_1.commitToDB)(prisma_1.default.$queryRaw `
      SELECT als.id, als.name, als."rentalType", als.price,
        AVG(alsr.rating) AS rating,
        (
          SELECT alsi.url
          FROM ortani."AlsintanImage" alsi
          WHERE alsi."alsintanId" = als.id ORDER BY alsi.sequence
          LIMIT 1
        ) AS "thumbnailUrl",
        (
          SELECT COUNT(also.id)
          FROM ortani."AlsintanOrder" also
          WHERE also."alsintanId" = als.id AND also.status = 'completed'
        ) AS sold
      FROM ortani."Alsintan" als
      LEFT JOIN ortani."AlsintanReview" alsr ON als.id = alsr."alsintanId"
      ${filter}
      GROUP BY als.id
      ORDER BY sold DESC, als.id ASC
      LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `.then((products) => products.map((_a) => {
            var { price, rating } = _a, product = __rest(_a, ["price", "rating"]);
            return (Object.assign(Object.assign({}, product), { price: price.toNumber(), rating: rating ? (0, utils_1.roundDecimals)(rating, 1) : null }));
        })), reply);
    });
}
exports.getAllProducts = getAllProducts;
