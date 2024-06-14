import { insertData } from "./insert-data.js";
import { dropTables, createTables } from "./manage-tables.js";

const seed = async () => {
  await dropTables();
  await createTables();
  return await insertData();
};

export default seed;
