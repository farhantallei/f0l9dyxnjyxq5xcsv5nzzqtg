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
exports.completeAppointment = exports.rejectAppointment = exports.acceptAppointment = exports.createAppointmentSessionLog = exports.getAppointmentById = exports.getAllRequestedAppointments = exports.getAllAppointments = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const utils_1 = require("../../../utils");
function getAllAppointments(reply, agronomId, status) {
    return __awaiter(this, void 0, void 0, function* () {
        const now = Date.now();
        const statusObj = {
            completed: 'completed',
            rejected: 'rejected',
            accepted: 'accepted',
            available: 'accepted',
            expired: undefined,
        };
        const timeObj = {
            accepted: { gt: new Date(now) },
            available: {
                gt: new Date(now - 3600000),
                lte: new Date(now),
            },
        };
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronomAppointment
            .findMany({
            where: {
                agronomId,
                status: statusObj[status],
                OR: status === 'expired'
                    ? [
                        {
                            status: 'accepted',
                            time: { lt: new Date(now), lte: new Date(now - 3600000) },
                        },
                        { status: 'requested', time: { lte: new Date(now) } },
                    ]
                    : undefined,
                time: status === 'accepted' || status === 'available'
                    ? timeObj[status]
                    : undefined,
            },
            select: {
                id: true,
                time: true,
                user: {
                    select: {
                        name: true,
                        addresses: {
                            select: { regency: { select: { name: true } } },
                            where: { main: true },
                        },
                        profileUrl: true,
                    },
                },
            },
            orderBy: {
                time: 'desc',
            },
        })
            .then((appointments) => appointments.map((_a) => {
            var { time, user: { name, addresses, profileUrl } } = _a, appointment = __rest(_a, ["time", "user"]);
            return (Object.assign(Object.assign({}, appointment), { time: time.getTime(), name, regency: addresses.length > 0 ? addresses[0].regency.name : null, profileUrl }));
        })), reply);
    });
}
exports.getAllAppointments = getAllAppointments;
function getAllRequestedAppointments(reply, agronomId) {
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
        })
            .then((appointments) => appointments.map((_a) => {
            var { time, user: { name, profileUrl } } = _a, appointment = __rest(_a, ["time", "user"]);
            return (Object.assign(Object.assign({}, appointment), { time: time.getTime(), name,
                profileUrl }));
        })), reply);
    });
}
exports.getAllRequestedAppointments = getAllRequestedAppointments;
function getAppointmentById(reply, id, agronomId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronomAppointment
            .findUnique({
            where: { id, agronomId },
            select: {
                agronomId: true,
                id: true,
                time: true,
                status: true,
                user: {
                    select: {
                        name: true,
                        addresses: {
                            select: { regency: { select: { name: true } } },
                            where: { main: true },
                        },
                        profileUrl: true,
                    },
                },
            },
        })
            .then((appointment) => {
            if (!appointment)
                return null;
            const { time } = appointment, _a = appointment.user, { addresses } = _a, userRest = __rest(_a, ["addresses"]), appointmentRest = __rest(appointment, ["time", "user"]);
            return Object.assign(Object.assign(Object.assign({}, appointmentRest), userRest), { time: time.getTime(), regency: addresses.length > 0 ? addresses[0].regency.name : null });
        }), reply);
    });
}
exports.getAppointmentById = getAppointmentById;
function createAppointmentSessionLog(reply, appointmentId, status) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronomAppointmentSessionLog.create({
            data: { appointmentId, status, role: 'agronom' },
        }), reply);
    });
}
exports.createAppointmentSessionLog = createAppointmentSessionLog;
function acceptAppointment(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronomAppointment.update({
            where: { id, status: 'requested' },
            data: { status: 'accepted' },
        }), reply);
    });
}
exports.acceptAppointment = acceptAppointment;
function rejectAppointment(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronomAppointment.update({
            where: { id, status: 'requested' },
            data: { status: 'rejected' },
        }), reply);
    });
}
exports.rejectAppointment = rejectAppointment;
function completeAppointment(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.agronomAppointment.update({
            where: { id, status: 'accepted' },
            data: { status: 'completed' },
        }), reply);
    });
}
exports.completeAppointment = completeAppointment;
