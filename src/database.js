const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/chat")
  .then(() => {
    console.log("DB Connect");
  })
  .catch((err) => console.log(err));
