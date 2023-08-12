"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterIFSSchema = exports.ListIFSSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListIFSSchema = {
    summary: 'Daftar IFS',
    description: 'Untuk menampilkan daftar IFS.',
    tags: ['Admin / Affiliate'],
    querystring: type_provider_typebox_1.Type.Object({
        start: type_provider_typebox_1.Type.Integer({ minimum: 0 }),
        size: type_provider_typebox_1.Type.Union([
            type_provider_typebox_1.Type.Literal(5),
            type_provider_typebox_1.Type.Literal(10),
            type_provider_typebox_1.Type.Literal(15),
            type_provider_typebox_1.Type.Literal(20),
            type_provider_typebox_1.Type.Literal(25),
            type_provider_typebox_1.Type.Literal(30),
            type_provider_typebox_1.Type.Literal(50),
            type_provider_typebox_1.Type.Literal(100),
        ]),
        filters: type_provider_typebox_1.Type.String(),
        globalFilter: type_provider_typebox_1.Type.String(),
        sorting: type_provider_typebox_1.Type.String(),
    }),
    response: { 204: type_provider_typebox_1.Type.Undefined() },
};
exports.RegisterIFSSchema = {
    summary: 'Daftar IFS oleh Admin',
    description: 'Untuk mendaftar IFS oleh Admin.',
    tags: ['Admin / Affiliate'],
    body: type_provider_typebox_1.Type.Object({
        name: type_provider_typebox_1.Type.String(),
        email: type_provider_typebox_1.Type.String({ format: 'email' }),
        mobile: type_provider_typebox_1.Type.String(),
        ktpAddress: type_provider_typebox_1.Type.String(),
        domicileAddress: type_provider_typebox_1.Type.String(),
        landAddress: type_provider_typebox_1.Type.String(),
        totalLandArea: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        registeredLandArea: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        cropCommodity: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Boolean(), { minItems: 2, maxItems: 2 }),
        ktpNumber: type_provider_typebox_1.Type.String(),
        ktpUrl: type_provider_typebox_1.Type.String(),
        kkNumber: type_provider_typebox_1.Type.String(),
        kkUrl: type_provider_typebox_1.Type.String(),
        passportPhotoUrl: type_provider_typebox_1.Type.String(),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
