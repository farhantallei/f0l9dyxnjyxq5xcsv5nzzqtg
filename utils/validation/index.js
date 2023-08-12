"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ktpValidation = exports.emailValidation = void 0;
const EMAIL = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
const KTP = /^\d{16}$/;
function emailValidation(value) {
    return EMAIL.test(value);
}
exports.emailValidation = emailValidation;
function ktpValidation(value) {
    return KTP.test(value);
}
exports.ktpValidation = ktpValidation;
