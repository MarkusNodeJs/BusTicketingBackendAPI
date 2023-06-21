import con from "../config/db.js";
import bcrypt from "bcrypt";

const db = con;

//Register user
const registerUser = async (req, res) => {
  const { Firstname, Lastname, Middlename, Position, Username, Password } =
    req.body;
  const hashpassword = await bcrypt.hash(Password, 10);
  const isResgisterUser = "Select * from users WHERE Username = ?";
  db.query(isResgisterUser, Username, (err, result) => {
    if (result != "") {
      res.status(301).json({ message: "Username is already exist" });
      console.log(result);
    }
    if (result == "") {
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
            console.log("Successfully Added");
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

// const getResponse = async (req, res) => {
//   const { id } = req.params;
//   const {
//     object,
//     address,
//     balance,
//     created,
//     currency,
//     default_source,
//     delinquent,
//     description,
//     discount,
//     email,
//     invoce_prefix,
//     invoice_settings,
//     custom_fields,
//     default_payment_method,
//     footer,
//     rendering_options,
//     livemode,
//     metadata,
//     orderid,
//     name,
//     next_invoce_sequence,
//     phone,
//     prefered_locales,
//     shipping,
//     tax_axemp,
//     test_clock,
//   } = req.body;

//   const sql =
//     "insert into stripe(object, address,balance,created,currency,default_source,delinquent,description,invoce_prefix,invoice_settings,custom_fields,default_payment_method,footer,rendering_options,livemode,metadata,orderid,name,next_invoce_sequence,phone,prefered_locales,shipping,tax_axemp,test_clock) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,? ,? ,?";

//   db.query(
//     sql,
//     [
//       object,
//       address,
//       balance,
//       created,
//       currency,
//       default_source,
//       delinquent,
//       description,
//       invoce_prefix,
//       invoice_settings,
//       custom_fields,
//       default_payment_method,
//       footer,
//       rendering_options,
//       livemode,
//       metadata,
//       orderid,
//       name,
//       next_invoce_sequence,
//       phone,
//       prefered_locales,
//       shipping,
//       tax_axemp,
//       test_clock,
//     ],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.status(200).json({
//           message: "Success",
//         });
//       }
//     }
//   );
// };

export { registerUser, getAllUser, getOneUser, deleteUser, updateUser };
