// routes/fetchData.js

import express from "express";
import { getVideos } from "../controllers/fetchData.js";

const router = express.Router();


router.get("/", getVideos);

export default router;
