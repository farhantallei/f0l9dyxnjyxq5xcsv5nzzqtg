"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("../lib/nodemailer"));
function text(reply, config) {
    nodemailer_1.default.sendMail(Object.assign({ from: 'farhan.pradana55@gmail.com' }, config), (error) => {
        if (error)
            return reply.internalServerError(error.message);
    });
}
function html(reply, config) {
    nodemailer_1.default.sendMail(Object.assign({ from: 'farhan.pradana55@gmail.com' }, config), (error) => {
        if (error)
            return reply.internalServerError(error.message);
    });
}
const sendToMail = { text, html };
exports.default = sendToMail;
