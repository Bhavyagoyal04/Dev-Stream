import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { syncUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/sync", protectRoute, syncUser);

export default router;