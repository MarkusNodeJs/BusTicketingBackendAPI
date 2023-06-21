import express from "express";
const router = express.Router();
import {
  registerUser,
  getAllUser,
  getOneUser,
  deleteUser,
  updateUser,
} from "../controller/userController.js";

router.post("/user", registerUser);
router.get("/user", getAllUser);
router.get("/user/:id", getOneUser);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);

export default router;
