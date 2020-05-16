require("dotenv").config();

const app = require("./server/config");
require("./database");

async function main() {
  await app.listen(app.get("port"));
  console.log("server on: ", app.get("port"));
}

main();
