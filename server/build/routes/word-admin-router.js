"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableAdminRoutes = void 0;
const express_1 = require("express");
const verify_admin_role_1 = require("../middleware/verify-admin-role");
const enableAdminRoutes = (app, database) => {
    const router = (0, express_1.Router)();
    router.use(verify_admin_role_1.verifyAdminRole);
    router.post("/add-word", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const parentId = yield database.insertWord(req.body);
            res.status(200).send({ parentId: parentId });
        }
        catch (error) {
            res.status(500).send({ error: error });
        }
        ;
    }));
    router.put("/update-word", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const parentWordId = yield database.updateWord(req.body);
            res.status(200).send({ parentWordId: parentWordId });
        }
        catch (error) {
            res.status(500).send({ error: error });
        }
        ;
    }));
    router.delete("/delete-word", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield database.deleteWord(req.body);
            res.status(204).send({ success: true });
        }
        catch (error) {
            res.status(500).send({ error: error });
        }
        ;
    }));
    app.use(router);
};
exports.enableAdminRoutes = enableAdminRoutes;
