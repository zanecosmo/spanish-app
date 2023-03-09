"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestructureError = exports.validateInput = exports.hasNoCharacters = exports.buildResponseBody = exports.extractCookies = exports.logError = void 0;
const logError = (err) => err && console.log(`ERROR: ${err}`);
exports.logError = logError;
const extractCookies = (cookie) => {
    return cookie.split(";").reduce((res, item) => {
        const data = item.trim().split("=");
        return Object.assign(Object.assign({}, res), { [data[0]]: data[1] });
    }, {});
};
exports.extractCookies = extractCookies;
function buildResponseBody(data, errorName, message) {
    return {
        data: data,
        error: errorName ? errorName : null,
        message: message ? message : null
    };
}
exports.buildResponseBody = buildResponseBody;
;
const hasNoCharacters = (text) => {
    for (let i = 0; i < text.length; i++) {
        if (text[i] !== " ")
            return false;
    }
    ;
    return true;
};
exports.hasNoCharacters = hasNoCharacters;
const validateInput = (value, input) => {
    if (value === null)
        return `DOM does not contain ${input}-input element`;
    if (value.length === 0)
        return `* must enter a value for the ${input} input`;
    if ((0, exports.hasNoCharacters)(value))
        return `*${input} input must contain characters`;
    if (value.includes(" "))
        return `${input} must not contain spaces`;
    if (input === "password" && value.length < 8)
        return `${input} must be at least 8 charaters`;
    return null;
};
exports.validateInput = validateInput;
const DestructureError = (error) => {
    if (error instanceof Error)
        return error;
    else
        return { name: "UNKNOWN", message: "NON-ERROR COUGHT IN TRY-CATCH" };
};
exports.DestructureError = DestructureError;
