const mongoose = require("mongoose");

const URI =
  "mongodb+srv://imagedb:imagedb@cluster0-yg9o2.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected"))
  .catch(() => console.error("Database error conection"));

// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://imagedb:<password>@cluster0-yg9o2.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
