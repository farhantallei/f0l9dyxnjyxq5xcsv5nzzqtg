"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundDecimals = void 0;
function roundDecimals(float, decimalPlaces = 1) {
    if (decimalPlaces < 0)
        decimalPlaces = 0;
    else if (decimalPlaces > 100)
        decimalPlaces = 100;
    const multiplesOf10 = Math.pow(10, decimalPlaces);
    return Math.round((float + Number.EPSILON) * multiplesOf10) / multiplesOf10;
}
exports.roundDecimals = roundDecimals;
