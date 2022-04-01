/* db.js */

import { Client } from "https://deno.land/x/mysql/mod.ts";

const home = Deno.env.get("HOME");
console.log(`HOME: ${home}`);

const connectionData = {
  "/home/codio": {
    hostname: "127.0.0.1",
    username: "websiteuser",
    password: "websitepassword",
    db: "website",
  },
  "/app": {
    hostname: "remotemysql.com",
    username: "5D8BNSOGd6",
    password: "n8XX7ZMB1f",
    db: "5D8BNSOGd6",
  },
};

const conn = connectionData[home];
console.log(conn);

const db = await new Client().connect(conn);

export { db };
