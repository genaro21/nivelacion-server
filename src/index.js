const server = require("./server");
require("./database");

server.listen(server.get("port"), () => {
  console.log("Server is running on port :", server.get("port"));
});
