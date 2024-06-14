import pg from "pg";
const { Pool } = pg;

if (!process.env.PGDATABASE) {
  throw new Error("No PGDATABASE configured");
}

export default new Pool();
