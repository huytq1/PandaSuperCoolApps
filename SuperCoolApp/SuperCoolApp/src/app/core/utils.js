"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = (function () {
    function Utils() {
    }
    Utils.convertToDate = function (input) {
        if (input === null || input === '') {
            return;
        }
        var matches = input.match(/^(\d{1,2})[- /.](\d{1,2})[- /.](\d{4})$/);
        var day = parseInt(matches[1], 10);
        var month = parseInt(matches[2], 10);
        var year = parseInt(matches[3], 10);
        var output = new Date(year, month - 1, day);
        return output;
    };
    Utils.convertDateStringToISO = function (input) {
        if (input == undefined || input == '') {
            return '';
        }
        var dateValue = this.convertToDate(input);
        return this.toISODate(dateValue);
    };
    Utils.toISODate = function (input) {
        if (input == undefined) {
            return "";
        }
        var pad = function (num) {
            var norm = Math.abs(Math.floor(num));
            return (norm < 10 ? '0' : '') + norm;
        };
        return input.getFullYear() + '-' + pad(input.getMonth() + 1) + '-' + pad(input.getDate())
            + 'T' + pad(input.getHours())
            + ':' + pad(input.getMinutes())
            + ':' + pad(input.getSeconds())
            + '.000Z';
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map