const mongoose = require("mongoose");

const URI =
  "mongodb+srv://imagedb:imagedb@cluster0-yg9o2.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("database connected"))
  .catch(() => console.error("Database error conection"));
