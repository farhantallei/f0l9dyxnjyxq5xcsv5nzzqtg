"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListIncomingOrdersSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListIncomingOrdersSchema = {
    summary: 'Daftar Pesanan Masuk',
    description: 'Untuk menampilkan daftar pesanan masuk.',
    tags: ['Admin.Transaction.Sale'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            invoice: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.String(), type_provider_typebox_1.Type.Null()]),
            customer: type_provider_typebox_1.Type.Object({
                id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
            }),
            createdAt: type_provider_typebox_1.Type.Number(),
            paymentMethod: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Literal('cash')]),
        })),
    },
};
