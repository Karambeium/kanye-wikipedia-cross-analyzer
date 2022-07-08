import { MongoClient } from "mongodb";
require("dotenv").config();
// Connection URI
const uri = process.env.MONGO_DB;
// Create a new MongoClient
const client = new MongoClient(uri);
let dbConn;
async function run() {
  // Connect the client to the server
  await client.connect();
  // Establish and verify connection
  dbConn = client.db(process.env.DB_NAME);
  await dbConn.command({ ping: 1 });
  console.log("Connected successfully to server");
  return dbConn;
}

const getDbConn = async () => dbConn;

export default dbConn ? getDbConn : run;
