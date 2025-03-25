import { addToSave, getSave, removeFromSave } from "../controllers/saved.controller.js";
import express from "express";
import verifyUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addsave", verifyUser, addToSave);
router.get("/getsaves", verifyUser, getSave);
router.delete("/:masonryId", verifyUser, removeFromSave);

export default router;