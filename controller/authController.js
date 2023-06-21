import con from "../config/db.js";
const db = con;
import bcrypt from "bcrypt";

const login = async (req, res) => {
  const { Username, Password } = req.body;
  const sql = `SELECT * FROM users WHERE Username= ?`;
  db.query(sql, Username, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length === 0) {
      res.status(401).json({ message: "Invalid Username or Password" });
      console.log(result);
    } else {
      const user = result[0];

      bcrypt.compare(Password, user.Password, (err, isMatch) => {
        if (err) {
          console.log(err);
        }
        if (isMatch) {
          // Passwords match, user is authenticated
          res.status(200).json({ message: "Login Successful" });
          console.log("Login Successfully");
        } else {
          res.status(401).json({ message: "Invalid Username or Password" });
        }
      });
    }
  });
};

export { login };
