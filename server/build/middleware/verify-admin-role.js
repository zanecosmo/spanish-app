"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminRole = void 0;
const types_1 = require("../types");
const utils_1 = require("../utils");
const verifyAdminRole = (req, res, next) => {
    if (req.body.user.role !== types_1.Roles.ADMIN) {
        res.status(401).send((0, utils_1.buildResponseBody)(null, undefined, "ONLY ADMINS ALTER ADD WORDS"));
        return;
    }
    ;
    next();
};
exports.verifyAdminRole = verifyAdminRole;
