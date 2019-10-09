"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getDateTime(date) {
    if (date === undefined) {
        throw new Error('Date cannot be undefined!');
    }
    var year = date.getUTCFullYear();
    var month = formatDigits(date.getUTCMonth() + 1);
    var day = formatDigits(date.getUTCDate());
    var hour = formatDigits(date.getUTCHours());
    var minute = formatDigits(date.getMinutes());
    var second = formatDigits(date.getSeconds());
    // YYYYMMDD'T'HHMMSS'Z'
    return year.toString() + month + day + 'T' + hour + minute + second + 'Z';
}
exports.getDateTime = getDateTime;
function formatDigits(time) {
    var result = time.toString();
    if (time < 10) {
        result = '0' + time.toString();
    }
    return result;
}
