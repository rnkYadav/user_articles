const mongoose = require("mongoose");
global.mongoose = mongoose;
global.ObjectId = mongoose.Types.ObjectId;

const Database = require("../Model/Database");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Server = require("./Server");
console.log("App file");
const db = new Database(process.env.DB_URI);
db.connectDatabase().then(() => {
  console.log("Database connected");
  Server.initiateServer();
});
// const server =  Server.getServer();
