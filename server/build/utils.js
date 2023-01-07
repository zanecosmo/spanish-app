"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCookies = exports.logError = void 0;
var logError = function (err) { return err && console.log("ERROR: ".concat(err)); };
exports.logError = logError;
var extractCookies = function (cookie) {
    return cookie.split(";").reduce(function (res, item) {
        var _a;
        var data = item.trim().split("=");
        return __assign(__assign({}, res), (_a = {}, _a[data[0]] = data[1], _a));
    }, {});
};
exports.extractCookies = extractCookies;
