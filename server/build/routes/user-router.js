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
exports.enableUserRouter = void 0;
const express_1 = require("express");
const utils_1 = require("../utils");
const enableUserRouter = (app, database) => {
    const router = (0, express_1.Router)();
    router.get("/get-word-pairs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const wordsPayload = yield database.getBaseWordPairs(req.body.user);
            res.status(200).send((0, utils_1.buildResponseBody)(wordsPayload));
        }
        catch (error) {
            const { name, message } = (0, utils_1.DestructureError)(error);
            res.status(500).send((0, utils_1.buildResponseBody)(null, name, message));
        }
        ;
    }));
    router.get("/get-word/:wordId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const wordId = parseInt(req.params.wordId, 10);
            const word = yield database.getWord(wordId, req.body.user);
            res.status(200).send((0, utils_1.buildResponseBody)(word));
        }
        catch (error) {
            const { name, message } = (0, utils_1.DestructureError)(error);
            res.status(500).send((0, utils_1.buildResponseBody)(null, name, message));
        }
        ;
    }));
    router.put("/update-difficulties", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield database.updateDifficulties(req.body.difficulties, req.body.user);
            res.status(200).send((0, utils_1.buildResponseBody)(null));
        }
        catch (error) {
            const { name, message } = (0, utils_1.DestructureError)(error);
            res.status(500).send((0, utils_1.buildResponseBody)(null, name, message));
        }
        ;
    }));
    router.put("/update-group", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { group, parentWordId } = req.body;
            const groupDTO = { group: group, parentWordId: parentWordId };
            const newGroup = yield database.updateGroup(groupDTO, req.body.user);
            res.status(200).send((0, utils_1.buildResponseBody)(newGroup));
        }
        catch (error) {
            const { name, message } = (0, utils_1.DestructureError)(error);
            res.status(500).send((0, utils_1.buildResponseBody)(null, name, message));
        }
        ;
    }));
    app.use(router);
};
exports.enableUserRouter = enableUserRouter;
