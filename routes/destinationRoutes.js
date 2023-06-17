import express from "express";
const router = express.Router();
import {
  getAllDestination,
  addDestination,
  getOneDestination,
  deleteDestination,
  updateDestination,
} from "../controller/destinationController.js";

router.get("/destination", getAllDestination);
router.post("/destination", addDestination);
router.get("/destination/:desid", getOneDestination);
router.delete("/destination/:desid", deleteDestination);
router.put("/destination/:desid", updateDestination);

export default router;
