const { insertData } = require("./insert-data.js");
const { dropTables, createTables } = require("./manage-tables.js");

const seed = () => {
  return dropTables()
    .then(() => {
      return createTables();
    })
    .then(() => {
      return insertData();
    });
};

module.exports = seed;
