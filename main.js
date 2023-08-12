"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_ui_1 = require("@socket.io/admin-ui");
const app_1 = __importStar(require("./app"));
const env_1 = require("./env");
const app_2 = require("./app");
(0, app_1.addPlugins)();
(0, app_1.addRoutes)();
app_1.default.ready(() => {
    app_2.agronomConsultationIo.on('connection', (socket) => {
        socket.on('joinRoom', (roomId) => {
            socket.join(roomId.toString());
        });
        socket.on('leaveRoom', (roomId) => {
            socket.leave(roomId.toString());
        });
    });
    app_2.agronomAppointmentIo.on('connection', (socket) => {
        socket.on('join', ({ appointmentId, offer }) => {
            socket.join(appointmentId.toString());
            socket
                .to(appointmentId.toString())
                .emit('incomingOffer', { appointmentId, offer });
        });
        socket.on('answer', ({ appointmentId, answer }) => {
            socket.to(appointmentId.toString()).emit('incomingAnswer', { answer });
        });
        socket.on('candidate', ({ appointmentId, candidate }) => {
            socket
                .to(appointmentId.toString())
                .emit('incomingCandidate', { candidate });
        });
        socket.on('leave', ({ appointmentId }) => {
            socket
                .to(appointmentId.toString())
                .emit('incomingHangup', { appointmentId });
            socket.leave(appointmentId.toString());
        });
    });
    (0, admin_ui_1.instrument)(app_2.io, { auth: false });
});
app_1.default.addHook('onClose', (_fastify, done) => {
    app_2.io.close();
    done();
});
app_1.default.listen({ port: env_1.PORT || 2134 }, (err, address) => {
    if (err) {
        console.error(err.message);
        return process.exit(1);
    }
    console.log(`\x1b[1m\x1b[33m[fastify] \x1b[0mServer is running at \x1b[1m\x1b[34m${address}\x1b[0m`);
});
