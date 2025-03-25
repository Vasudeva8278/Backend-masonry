import { addFavourite, getFavourites, removeFromFavourite } from "../controllers/favourite.controller.js";
import express from "express";
import verifyUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addfav", verifyUser, addFavourite);
router.get("/getfav", verifyUser, getFavourites);
router.delete("/:masonryId", verifyUser, removeFromFavourite); // Updated to use masonryId

export default router;