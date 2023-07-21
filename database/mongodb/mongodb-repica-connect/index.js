const db = require("mongoose");

require("dotenv").config();

// mongoose options
const options = {
  useNewUrlParser: true,
  autoIndex: true,
};

// mongodb environment variables
const { MONGO_HOSTNAME, MONGO_DB, MONGO_PORT } = process.env;

const dbConnectionURL = {
  LOCAL_DB_URL: `mongodb://127.0.0.1:27032/demo`,
  REMOTE_DB_URL: process.env.MONGODB_URI, //atlas url
};
db.connect(dbConnectionURL.LOCAL_DB_URL, options).catch((err) => {
    console.log(err);
});

// db connect success
db.connection.on("connected", () => {
    console.log("Mongoose connected to the database");
    }
);

