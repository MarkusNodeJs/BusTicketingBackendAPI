import con from "../config/db.js";

const db = con;

// add user
const addUser = async (req, res) => {
  const { Firstname, Lastname, Middlename, Position, Username, Password } =
    req.body;
  const sql =
    "INSERT INTO users(Firstname, Lastname, Middlename, Position, Username, Password) values (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [Firstname, Lastname, Middlename, Position, Username, Password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          message: "Successfully Added",
        });
      }
    }
  );
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
    }
  });
};

// update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { Firstname, Lastname, Middlename, Position, Username, Password } =
    req.body;
  const sql =
    "UPDATE users SET Firstname = ?, Lastname = ?, Middlename = ?, Position = ?, Username = ?, Password =? Where id = ?";
  db.query(
    sql,
    [Firstname, Lastname, Middlename, Position, Username, Password, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ message: "Updated Successfully" });
      }
    }
  );
};

export { addUser, getAllUser, getOneUser, deleteUser, updateUser };
