import { insertData } from "../insert-data.js";
import { dropTables, createTables } from "../manage-tables.js";

const seed = async ({ itemData }) => {
  return dropTables()
    .then(() => {
      return createTables();
    })
    .then(() => {
      return insertData(itemData);
    });
};

export default seed;
