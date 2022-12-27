import { config } from "mssql";
import dotenv from "dotenv";

dotenv.config();

export const databaseConfig: config = {
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