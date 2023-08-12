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
exports.getSomeCompletedAppointments = exports.getSomeRequestedAppointments = exports.getAllBanners = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const utils_1 = require("../../../utils");
function getAllBanners(reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.banner.findMany({
            where: { page: 'agronom_home' },
            select: { id: true, url: true },
        }), reply);
    });
}
exports.getAllBanners = getAllBanners;
function getSomeRequestedAppointments(reply, agronomId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronomAppointment
            .findMany({
            where: { agronomId, status: 'requested', time: { gt: new Date() } },
            select: {
                id: true,
                time: true,
                user: {
                    select: {
                        name: true,
                        profileUrl: true,
                    },
                },
            },
            orderBy: { time: 'asc' },
            take: 2,
        })
            .then((appointments) => appointments.map((_a) => {
            var { time, user: { name, profileUrl } } = _a, appointment = __rest(_a, ["time", "user"]);
            return (Object.assign(Object.assign({}, appointment), { time: time.getTime(), name,
                profileUrl }));
        })), reply);
    });
}
exports.getSomeRequestedAppointments = getSomeRequestedAppointments;
function getSomeCompletedAppointments(reply, agronomId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronomAppointment
            .findMany({
            where: { agronomId, status: 'completed' },
            select: {
                id: true,
                time: true,
                user: {
                    select: {
                        name: true,
                        profileUrl: true,
                    },
                },
            },
            orderBy: { time: 'desc' },
            take: 1,
        })
            .then((appointments) => appointments.map((_a) => {
            var { time, user: { name, profileUrl } } = _a, appointment = __rest(_a, ["time", "user"]);
            return (Object.assign(Object.assign({}, appointment), { time: time.getTime(), name,
                profileUrl }));
        })), reply);
    });
}
exports.getSomeCompletedAppointments = getSomeCompletedAppointments;
