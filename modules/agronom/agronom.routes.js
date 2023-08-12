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
Object.defineProperty(exports, "__esModule", { value: true });
exports.agronomRoutes = void 0;
const auth_routes_1 = require("./auth/auth.routes");
const consultation_routes_1 = require("./consultation/consultation.routes");
const appointment_routes_1 = require("./appointment/appointment.routes");
const profile_routes_1 = require("./profile/profile.routes");
const home_routes_1 = require("./home/home.routes");
const agronomRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.register(auth_routes_1.authRoutes, { prefix: 'auth' });
    route.register(home_routes_1.homeRoutes, { prefix: 'home' });
    route.register(profile_routes_1.profileRoutes, { prefix: 'profile' });
    route.register(appointment_routes_1.appointmentRoutes, { prefix: 'appointment' });
    route.register(consultation_routes_1.consultationRoutes, { prefix: 'consultation' });
});
exports.agronomRoutes = agronomRoutes;
