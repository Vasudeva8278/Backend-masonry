import { addToSave, getSave, removeFromSave } from "../controllers/saved.controller.js";
import express from "express";
import verifyUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", verifyUser, addToSave);
router.get("/:userId", verifyUser, getSave);
router.delete("/:savedId", verifyUser, removeFromSave);

export default router;