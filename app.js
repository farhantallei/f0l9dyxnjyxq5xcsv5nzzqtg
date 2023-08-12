"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRoutes = exports.addPlugins = exports.agronomAppointmentIo = exports.agronomConsultationIo = exports.io = void 0;
const cookie_1 = __importDefault(require("@fastify/cookie"));
const cors_1 = __importDefault(require("@fastify/cors"));
const sensible_1 = __importDefault(require("@fastify/sensible"));
const static_1 = __importDefault(require("@fastify/static"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const fastify_1 = __importDefault(require("fastify"));
const env_1 = require("./env");
const routes_1 = require("./routes");
const env_2 = require("./env");
const path_1 = __importDefault(require("path"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, fastify_1.default)({
    maxParamLength: 300,
    serverFactory: http_1.createServer,
}).withTypeProvider();
const origin = [
    'http://127.0.0.1:5173',
    'http://localhost:5173',
    'https://admin.socket.io',
];
exports.io = new socket_io_1.Server(app.server, {
    cors: { credentials: true, origin },
});
exports.agronomConsultationIo = exports.io.of('/agronom/consultation');
exports.agronomAppointmentIo = exports.io.of('/agronom/appointment');
function addPlugins() {
    app.register(cookie_1.default, { secret: env_1.COOKIE_SECRET });
    app.register(cors_1.default, { credentials: true, origin });
    app.register(sensible_1.default);
    app.register(static_1.default, {
        root: path_1.default.join(__dirname, 'assets'),
        prefix: '/assets',
    });
    if (env_2.NODE_ENV === 'development') {
        app.register(swagger_1.default, {
            mode: 'dynamic',
            openapi: {
                info: {
                    title: 'Ortani API',
                    description: 'API for Ortani.id',
                    version: '1.0.0',
                },
            },
        });
        app.register(swagger_ui_1.default, {
            routePrefix: '/docs',
            uiConfig: {
                docExpansion: 'none',
                deepLinking: false,
            },
            staticCSP: true,
            transformStaticCSP: (header) => header,
        });
    }
}
exports.addPlugins = addPlugins;
function addRoutes() {
    app.register(routes_1.routes, { prefix: 'v1' });
}
exports.addRoutes = addRoutes;
exports.default = app;
