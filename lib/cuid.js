"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createId = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
exports.createId = (0, cuid2_1.init)({
    random: Math.random,
    length: 10,
    fingerprint: 'a-custom-host-fingerprint',
});
