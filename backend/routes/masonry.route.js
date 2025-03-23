import {uploadMasonry,getMasonry} from "../controllers/masonry.controller.js";
import express from "express";

const routr = express.Router();

routr.post("/upload", uploadMasonry);
routr.get("/", getMasonry);



export default routr;