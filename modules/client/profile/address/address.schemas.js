"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListVillagesSchema = exports.ListDistrictsSchema = exports.ListRegenciesSchema = exports.ListProvincesSchema = exports.DeleteAddressSchema = exports.UpdateAddressSchema = exports.AddAddressSchema = exports.GetAddressSchema = exports.ListAddressesSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.ListAddressesSchema = {
    summary: 'Daftar alamat user',
    description: 'Untuk menampilkan daftar alamat user',
    tags: ['Client / Profile'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
            mobile: type_provider_typebox_1.Type.String(),
            address: type_provider_typebox_1.Type.String(),
            region: type_provider_typebox_1.Type.String(),
            main: type_provider_typebox_1.Type.Boolean(),
        })),
    },
};
exports.GetAddressSchema = {
    summary: 'Alamat Detail',
    description: 'Untuk menampilkan detail alamat.',
    tags: ['Client / Profile'],
    params: type_provider_typebox_1.Type.Object({
        addressId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            name: type_provider_typebox_1.Type.String(),
            mobile: type_provider_typebox_1.Type.String(),
            province: type_provider_typebox_1.Type.Object({
                provinceId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
            }),
            regency: type_provider_typebox_1.Type.Object({
                regencyId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
            }),
            district: type_provider_typebox_1.Type.Object({
                districtId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
            }),
            village: type_provider_typebox_1.Type.Object({
                villageId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
                name: type_provider_typebox_1.Type.String(),
            }),
            address: type_provider_typebox_1.Type.String(),
            main: type_provider_typebox_1.Type.Boolean(),
        }),
    },
};
exports.AddAddressSchema = {
    summary: 'Tambah Alamat',
    description: 'Menambahkan alamat user',
    tags: ['Client / Profile'],
    body: type_provider_typebox_1.Type.Object({
        name: type_provider_typebox_1.Type.String(),
        mobile: type_provider_typebox_1.Type.String(),
        provinceId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        regencyId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        districtId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        villageId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        address: type_provider_typebox_1.Type.String(),
        main: type_provider_typebox_1.Type.Boolean(),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.UpdateAddressSchema = {
    summary: 'Update Alamat',
    description: 'Melakukan update alamat',
    tags: ['Client / Profile'],
    params: type_provider_typebox_1.Type.Object({ addressId: type_provider_typebox_1.Type.Integer({ minimum: 1 }) }),
    body: type_provider_typebox_1.Type.Object({
        name: type_provider_typebox_1.Type.String(),
        mobile: type_provider_typebox_1.Type.String(),
        provinceId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        regencyId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        districtId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        villageId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        address: type_provider_typebox_1.Type.String(),
        main: type_provider_typebox_1.Type.Boolean(),
    }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.DeleteAddressSchema = {
    summary: 'Hapus Alamat',
    description: 'Melakukan hapus alamat',
    tags: ['Client / Profile'],
    params: type_provider_typebox_1.Type.Object({ addressId: type_provider_typebox_1.Type.Integer({ minimum: 1 }) }),
    response: {
        204: type_provider_typebox_1.Type.Undefined(),
    },
};
exports.ListProvincesSchema = {
    summary: 'Daftar Provinsi',
    description: 'Untuk menampilkan daftar provinsi.',
    tags: ['Client / Profile'],
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            provinceId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
        })),
    },
};
exports.ListRegenciesSchema = {
    summary: 'Daftar Kota/Kabupaten',
    description: 'Untuk menampilkan daftar kota/kabupaten.',
    tags: ['Client / Profile'],
    params: type_provider_typebox_1.Type.Object({
        provinceId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            regencyId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
        })),
    },
};
exports.ListDistrictsSchema = {
    summary: 'Daftar Kecamatan',
    description: 'Untuk menampilkan daftar kecamatan.',
    tags: ['Client / Profile'],
    params: type_provider_typebox_1.Type.Object({
        provinceId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        regencyId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            districtId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
        })),
    },
};
exports.ListVillagesSchema = {
    summary: 'Daftar Kelurahan/Desa',
    description: 'Untuk menampilkan daftar kelurahan/desa.',
    tags: ['Client / Profile'],
    params: type_provider_typebox_1.Type.Object({
        provinceId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        regencyId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        districtId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            villageId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            name: type_provider_typebox_1.Type.String(),
        })),
    },
};
