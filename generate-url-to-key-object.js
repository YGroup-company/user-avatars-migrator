console.log("\x1b[33m%s\x1b[0m", "STARTING SCRIPT");

import pkg from "pg";
const { Client } = pkg;
import { writeFile } from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

console.log("\x1b[33m%s\x1b[0m", "CONNECTING TO DATABASE");
const pgClient = new Client({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});
await pgClient.connect();

let imageUrlToKeyObject = {};

const records = await pgClient.query("SELECT image_url, image_key FROM user_avatars_to_process");

for (const { image_url, image_key } of records.rows) {
  imageUrlToKeyObject[image_url] = image_key;
}

writeFile("./image-url-to-key-object.json", JSON.stringify(imageUrlToKeyObject, null, 2));
