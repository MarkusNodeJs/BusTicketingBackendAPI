import con from "../config/db.js";
import bcrypt from "bcrypt";

const db = con;

// Register user
const registerUser = async (req, res) => {
  const { Firstname, Lastname, Middlename, Position, Username, Password } =
    req.body;
  const hashpassword = await bcrypt.hash(Password, 10);
  const isResgisteredUser = "Select * from users WHERE Username = ?";
  db.query(isResgisteredUser, Username, (err, user) => {
    if (!user) {
      res.status(301).json({ message: "Username is already exist" });
      console.log(result);
    }
    if (user) {
      db.query(
        `Insert into users SET ?`,
        {
          Firstname: Firstname,
          Lastname: Lastname,
          Middlename: Middlename,
          Position: Position,
          Username: Username,
          Password: hashpassword,
        },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({
              message: "Successfully Added",
            });
            console.log("User Successfully Added");
          }
        }
      );
    }
  });
};

// get all user
const getAllUser = async (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

// get single user
const getOneUser = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM users where id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users where id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).json({
        message: "Deleted Successfully",
      });
      console.log(result);
    }
  });
};

// update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { Firstname, Lastname, Middlename, Position, Username, Password } =
    req.body;
  const hashpassword = await bcrypt.hash(Password, 10);
  const sql =
    "UPDATE users SET Firstname = ?, Lastname = ?, Middlename = ?, Position = ?, Username = ?, Password =? Where id = ?";
  db.query(
    sql,
    [Firstname, Lastname, Middlename, Position, Username, hashpassword, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ message: "Updated Successfully" });
        console.log(result);
      }
    }
  );
};

export { registerUser, getAllUser, getOneUser, deleteUser, updateUser };
