"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.databaseConfig = {
    user: process.env.DB_USER,
    server: "localhost",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 1433,
    stream: false,
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
    pool: {
        max: 1,
        min: 1,
        idleTimeoutMillis: 30000
    }
};
