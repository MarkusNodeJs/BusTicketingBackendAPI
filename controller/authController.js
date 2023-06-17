import con from "../config/db.js";
const db = con;
import bcrypt from "bcrypt";

const login = async (req, res) => {
  const { Username, Password } = req.body;
  db.query(
    `SELECT * FROM users 
    WHERE Username= ?`,
    Username,
    (err, result) => {
      if (err) {
        return console.log(err);
      }
      if (!result.length || !bcrypt.compare(Password, result[0].Password)) {
        console.log(result);
        return res
          .status(401)
          .json({ message: "Username or password is incorrect" });
      }
      return res.status(200).json(result[0]);
    }
  );
};

export { login };
