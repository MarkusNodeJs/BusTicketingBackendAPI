import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const con = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});
con.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Database is Connected".bgGreen);
});

export default con;
