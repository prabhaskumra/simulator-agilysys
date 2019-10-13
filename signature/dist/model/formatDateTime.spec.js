"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatDT = require("./formatDateTime");
describe('signing/formatDateTime.ts', function () {
    it('It correctly produces a formatted date time.', function () {
        var date = new Date(1999, 11, 31, 15, 59, 59, 999);
        var result = formatDT.getDateTime(date);
        expect(result)
            .toBe('19991231T235959Z');
    });
    it('It throws an error when the input is undefined.', function () {
        var date = undefined;
        try {
            formatDT.getDateTime(date);
            fail();
        }
        catch (err) {
            // pass
        }
    });
});
