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
exports.getInvoiceByOrderId = exports.getBankAccountsById = exports.getOrderDetailsById = exports.countAllRequestedOrders = exports.getAllRequestedOrders = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const utils_1 = require("../../../../utils");
function getAllRequestedOrders(reply, userId, { page, limit, status, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const statusObj = {
            requested: 'requested',
            approved: 'approved',
            rented: 'rented',
            completed: 'completed',
            canceled: undefined,
        };
        const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        return yield (0, utils_1.commitToDB)(prisma_1.default.alsintanOrder
            .findMany({
            where: {
                userId,
                status: statusObj[status],
                OR: status === 'canceled'
                    ? [
                        { status: 'canceled' },
                        {
                            status: 'requested',
                            from: { lt: currentDate },
                        },
                        {
                            status: 'approved',
                            from: { lt: currentDate },
                        },
                        { AND: [{ to: null }, { NOT: [{ plot: null }] }] },
                        { AND: [{ NOT: [{ to: null }] }, { plot: null }] },
                    ]
                    : [
                        { AND: [{ to: null }, { NOT: [{ plot: null }] }] },
                        { AND: [{ NOT: [{ to: null }] }, { plot: null }] },
                    ],
                NOT: [{ invoice: null }],
            },
            take: limit,
            skip: (page - 1) * limit,
            select: {
                id: true,
                alsintan: {
                    select: {
                        name: true,
                        rentalType: true,
                        images: {
                            select: { url: true },
                            take: 1,
                            orderBy: { sequence: 'asc' },
                        },
                    },
                },
                status: true,
                landAreaTotal: true,
                plot: true,
                from: true,
                to: true,
                invoice: {
                    select: { status: true, paymentMethod: true, total: true },
                },
            },
        })
            .then((orders) => orders.map((_a) => {
            var { alsintan: { name, rentalType, images }, landAreaTotal, from, to, plot, invoice } = _a, order = __rest(_a, ["alsintan", "landAreaTotal", "from", "to", "plot", "invoice"]);
            return (Object.assign(Object.assign({}, order), { name,
                rentalType, details: {
                    total: rentalType === 'daily'
                        ? to.getDate() - from.getDate() + 1
                        : plot,
                    landAreaTotal,
                    from: from.getTime(),
                    to: (to === null || to === void 0 ? void 0 : to.getTime()) || null,
                }, payment: {
                    method: invoice.paymentMethod,
                    status: invoice.status,
                    total: invoice.total.toNumber(),
                }, thumbnailUrl: images.length < 1 ? null : images[0].url }));
        })), reply);
    });
}
exports.getAllRequestedOrders = getAllRequestedOrders;
function countAllRequestedOrders(reply, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.alsintanOrder.count({ where: { userId, status: 'requested' } }), reply);
    });
}
exports.countAllRequestedOrders = countAllRequestedOrders;
function getOrderDetailsById(reply, { userId, orderId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.alsintanOrder
            .findUnique({
            where: {
                id: orderId,
                userId,
                NOT: [{ invoice: null }],
                OR: [
                    { AND: [{ to: null }, { NOT: [{ plot: null }] }] },
                    { AND: [{ NOT: [{ to: null }] }, { plot: null }] },
                ],
            },
            select: {
                id: true,
                price: true,
                status: true,
                from: true,
                to: true,
                plot: true,
                landAddress: true,
                invoice: {
                    select: {
                        id: true,
                        invoice: true,
                        status: true,
                        paymentMethod: true,
                        subtotal: true,
                        discount: true,
                        total: true,
                    },
                },
                homeAddress: true,
                homeAddressName: true,
                homeAddressMobile: true,
                landAreaTotal: true,
                createdAt: true,
                alsintan: {
                    select: {
                        name: true,
                        rentalType: true,
                        images: {
                            select: { url: true },
                            take: 1,
                            orderBy: { sequence: 'asc' },
                        },
                    },
                },
            },
        })
            .then((product) => {
            var _a;
            if (!product)
                return null;
            const total = product.alsintan.rentalType === 'daily'
                ? product.to.getDate() - product.from.getDate() + 1
                : product.plot;
            return {
                id: product.id,
                name: product.alsintan.name,
                price: product.price.toNumber(),
                rentalType: product.alsintan.rentalType,
                status: product.status,
                from: product.from.getTime(),
                to: ((_a = product.to) === null || _a === void 0 ? void 0 : _a.getTime()) || null,
                plot: product.plot,
                landAddress: product.landAddress,
                payment: {
                    method: product.invoice.paymentMethod,
                    status: product.invoice.status,
                    subtotal: product.invoice.subtotal.toNumber(),
                    discount: product.invoice.discount.toNumber(),
                    total: product.invoice.total.toNumber(),
                },
                invoice: {
                    id: product.invoice.id,
                    code: product.invoice.invoice,
                },
                homeAddress: product.homeAddress,
                homeAddressName: product.homeAddressName,
                homeAddressMobile: product.homeAddressMobile,
                details: {
                    total,
                    landAreaTotal: product.landAreaTotal,
                },
                thumbnailUrl: product.alsintan.images.length < 1
                    ? null
                    : product.alsintan.images[0].url,
                createdAt: product.createdAt.getTime(),
            };
        }), reply);
    });
}
exports.getOrderDetailsById = getOrderDetailsById;
function getBankAccountsById(reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.bankAccount
            .findMany({
            select: {
                id: true,
                name: true,
                number: true,
                bank: { select: { name: true, code: true } },
            },
            take: 2,
        })
            .then((bankAccounts) => bankAccounts.map((_a) => {
            var { name, bank } = _a, rest = __rest(_a, ["name", "bank"]);
            return (Object.assign(Object.assign({}, rest), { bankCode: bank.code, bankName: bank.name, holder: name }));
        })), reply);
    });
}
exports.getBankAccountsById = getBankAccountsById;
function getInvoiceByOrderId(reply, { orderId, userId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.alsintanInvoice
            .findUnique({
            where: { orderId, order: { userId } },
            select: { id: true, total: true, invoice: true, paymentMethod: true },
        })
            .then((invoice) => {
            if (!invoice)
                return null;
            return {
                amount: invoice.total.toNumber(),
                paymentCode: (invoice.id % 999) + 1,
                invoiceCode: invoice.invoice,
                paymentMethod: invoice.paymentMethod,
            };
        }), reply);
    });
}
exports.getInvoiceByOrderId = getInvoiceByOrderId;
