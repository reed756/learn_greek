import { insertData } from "./insert-data.js";
import { dropTables, createTables } from "./manage-tables.js";

const seed = async () => {
  return dropTables()
    .then(() => {
      return createTables();
    })
    .then(() => {
      return insertData();
    });
};

export default seed;
