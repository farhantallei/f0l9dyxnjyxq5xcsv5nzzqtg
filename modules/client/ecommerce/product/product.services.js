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
exports.countProductReviews = exports.countProductSold = exports.countProducts = exports.averageProductRating = exports.getOutletById = exports.getProductById = exports.getCategoryById = exports.getFavoriteProductById = exports.getProductOutlets = exports.getProductStock = exports.getProductReviews = exports.getProductDetails = exports.getAllProducts = exports.getAllCategories = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const utils_1 = require("../../../../utils");
function getAllCategories(reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productCategory.findMany(), reply);
    });
}
exports.getAllCategories = getAllCategories;
function getAllProducts(reply, { page, limit }, { categoryId, searchQuery }) {
    return __awaiter(this, void 0, void 0, function* () {
        function setFilter() {
            if (categoryId && searchQuery)
                return client_1.Prisma.sql `WHERE p."categoryId" = ${categoryId} AND p."name" ILIKE ${'%' + searchQuery + '%'}`;
            if (categoryId)
                return client_1.Prisma.sql `WHERE p."categoryId" = ${categoryId}`;
            if (searchQuery)
                return client_1.Prisma.sql `WHERE p."name" ILIKE ${'%' + searchQuery + '%'}`;
            return client_1.Prisma.empty;
        }
        const filter = setFilter();
        return yield (0, utils_1.commitToDB)(prisma_1.default.$queryRaw `
      SELECT p.id, p.name,
        (
          SELECT pc.category
          FROM "ProductCategory" pc
          WHERE pc.id = p."categoryId"
        ),
        p.price,
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
      ${filter}
      GROUP BY p.id
      ORDER BY sold DESC, p.id ASC
      LIMIT ${limit} OFFSET ${(page - 1) * limit}`.then((products) => products.map((_a) => {
            var { price, rating, sold } = _a, product = __rest(_a, ["price", "rating", "sold"]);
            return (Object.assign(Object.assign({}, product), { price: price.toNumber(), rating: rating ? (0, utils_1.roundDecimals)(rating, 1) : null, sold: sold || 0 }));
        })), reply);
    });
}
exports.getAllProducts = getAllProducts;
function getProductDetails(reply, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.product
            .findUnique({
            where: { id: productId },
            select: {
                id: true,
                name: true,
                price: true,
                type: true,
                description: true,
                category: { select: { category: true } },
                brand: { select: { brand: true } },
                outlets: {
                    select: {
                        outlet: { select: { id: true, name: true } },
                        stock: true,
                    },
                },
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
            const brand = product.brand.brand;
            const price = product.price.toNumber();
            const outlets = product.outlets.map(({ outlet, stock }) => (Object.assign(Object.assign({}, outlet), { stock })));
            const reviews = product.reviews.map((_a) => {
                var { user: { name, profileUrl }, createdAt } = _a, review = __rest(_a, ["user", "createdAt"]);
                return Object.assign(Object.assign({}, review), { name,
                    profileUrl, createdAt: createdAt.getTime() });
            });
            return Object.assign(Object.assign({}, product), { category, brand, price, outlets, reviews });
        }), reply);
    });
}
exports.getProductDetails = getProductDetails;
function getProductReviews(reply, productId, { page, limit }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productReview
            .findMany({
            where: { productId },
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
function getProductStock(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productsOnOutlets.findUnique({
            where: { outletId_productId: id },
            select: { stock: true },
        }), reply).then((product) => (product ? product.stock : null));
    });
}
exports.getProductStock = getProductStock;
function getProductOutlets(reply, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.product
            .findUnique({
            where: { id: productId },
            select: {
                outlets: {
                    select: {
                        outlet: {
                            select: {
                                id: true,
                                name: true,
                                address: true,
                                village: true,
                                district: true,
                                regency: true,
                                province: true,
                            },
                        },
                    },
                },
            },
        })
            .then((product) => {
            if (!product)
                return null;
            return product.outlets.map((_a) => {
                var _b = _a.outlet, { address, village, district, regency, province } = _b, outlet = __rest(_b, ["address", "village", "district", "regency", "province"]);
                return (Object.assign(Object.assign({}, outlet), { address: `${address}, ${village}, Kec. ${district}, ${regency}, ${province}` }));
            });
        }), reply);
    });
}
exports.getProductOutlets = getProductOutlets;
function getFavoriteProductById(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productFavoritesOnUsers.findUnique({
            where: { userId_productId: id },
        }), reply);
    });
}
exports.getFavoriteProductById = getFavoriteProductById;
function getCategoryById(reply, categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productCategory.findUnique({ where: { id: categoryId } }), reply);
    });
}
exports.getCategoryById = getCategoryById;
function getProductById(reply, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.product.findUnique({ where: { id: productId } }), reply);
    });
}
exports.getProductById = getProductById;
function getOutletById(reply, outletId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.outlet.findUnique({ where: { id: outletId } }), reply);
    });
}
exports.getOutletById = getOutletById;
function averageProductRating(reply, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productReview
            .aggregate({
            where: { productId },
            _avg: { rating: true },
        })
            .then((result) => {
            const rating = result._avg.rating;
            if (rating == null)
                return null;
            return (0, utils_1.roundDecimals)(rating, 1);
        }), reply);
    });
}
exports.averageProductRating = averageProductRating;
function countProducts(reply, { categoryId, searchQuery }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.product.count({
            where: {
                name: { contains: searchQuery, mode: 'insensitive' },
                categoryId,
            },
        }), reply);
    });
}
exports.countProducts = countProducts;
function countProductSold(reply, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.$queryRaw `
      SELECT
        (
          SELECT SUM(poi.quantity)
          FROM "ProductOrderItem" poi
          LEFT JOIN "ProductOrder" po ON poi."orderId" = po.id
          WHERE poi."productId" = p.id AND po.status = 'complete'
        ) as sold
      FROM "Product" p
      WHERE p.id = ${productId}`.then((res) => res[0].sold || 0), reply);
    });
}
exports.countProductSold = countProductSold;
function countProductReviews(reply, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productReview.count({ where: { productId } }), reply);
    });
}
exports.countProductReviews = countProductReviews;
