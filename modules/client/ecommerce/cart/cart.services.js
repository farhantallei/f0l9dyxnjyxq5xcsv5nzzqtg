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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countCartProducts = exports.deleteCartProductOutlet = exports.deleteCartProduct = exports.updateCartProduct = exports.addCartProduct = exports.getProductStock = exports.getOutletById = exports.getProductById = exports.getCartProductById = exports.getAllCartProducts = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const utils_1 = require("../../../../utils");
function getAllCartProducts(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productCartsOnUsers
            .findMany({
            where: { userId },
            select: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        category: { select: { category: true } },
                        images: {
                            select: { url: true },
                            orderBy: { sequence: 'asc' },
                            take: 1,
                        },
                    },
                },
                outlet: { select: { id: true, name: true, regency: true } },
                quantity: true,
            },
            orderBy: { createdAt: 'desc' },
        })
            .then((products) => products.reduce((prev, curr) => {
            if (!prev.some(({ id }) => id === curr.outlet.id)) {
                prev.push(Object.assign(Object.assign({}, curr.outlet), { products: [
                        {
                            id: curr.product.id,
                            name: curr.product.name,
                            price: curr.product.price.toNumber(),
                            category: curr.product.category.category,
                            thumbnailUrl: curr.product.images.length
                                ? curr.product.images[0].url
                                : null,
                            quantity: curr.quantity,
                        },
                    ] }));
            }
            else {
                const outletIdx = prev.findIndex(({ id }) => id === curr.outlet.id);
                prev[outletIdx].products.push({
                    id: curr.product.id,
                    name: curr.product.name,
                    price: curr.product.price.toNumber(),
                    category: curr.product.category.category,
                    thumbnailUrl: curr.product.images.length
                        ? curr.product.images[0].url
                        : null,
                    quantity: curr.quantity,
                });
            }
            return prev;
        }, [])), reply);
    });
}
exports.getAllCartProducts = getAllCartProducts;
function getCartProductById(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productCartsOnUsers.findUnique({
            where: { userId_productId_outletId: id },
        }), reply);
    });
}
exports.getCartProductById = getCartProductById;
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
function getProductStock(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productsOnOutlets.findUnique({
            where: { outletId_productId: id },
            select: { stock: true },
        }), reply).then((product) => (product ? product.stock : null));
    });
}
exports.getProductStock = getProductStock;
function addCartProduct(reply, id, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productCartsOnUsers.create({ data: Object.assign(Object.assign({}, id), { quantity }) }), reply);
    });
}
exports.addCartProduct = addCartProduct;
function updateCartProduct(reply, id, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productCartsOnUsers.update({
            where: { userId_productId_outletId: id },
            data: { quantity },
        }), reply);
    });
}
exports.updateCartProduct = updateCartProduct;
function deleteCartProduct(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productCartsOnUsers.delete({
            where: { userId_productId_outletId: id },
        }), reply);
    });
}
exports.deleteCartProduct = deleteCartProduct;
function deleteCartProductOutlet(reply, userId, outletId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productCartsOnUsers.deleteMany({ where: { userId, outletId } }), reply);
    });
}
exports.deleteCartProductOutlet = deleteCartProductOutlet;
function countCartProducts(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.productCartsOnUsers.count({ where: { userId } }), reply);
    });
}
exports.countCartProducts = countCartProducts;
