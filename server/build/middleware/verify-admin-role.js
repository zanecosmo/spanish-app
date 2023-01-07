"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminRole = void 0;
var types_1 = require("../types");
var verifyAdminRole = function (req, res, next) {
    if (req.body.user !== types_1.Roles.ADMIN) {
        res.status(401).send({ success: false, message: "ONLY ADMINS CAN ADD WORDS" });
        return;
    }
    ;
    next();
};
exports.verifyAdminRole = verifyAdminRole;
