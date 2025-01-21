import pg from "pg";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));

const { Pool } = pg;
const ENV = process.env.NODE_ENV || "development";

const pathToCorrectEnvFile = `${__dirname}/../.env.${ENV}`;

dotenv.config({
  path: pathToCorrectEnvFile,
});

if (!process.env.PGDATABASE) {
  throw new Error("No PGDATABASE configured");
}

export default new Pool();
