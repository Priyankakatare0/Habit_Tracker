import express from "express"
import authMiddleware from "../middleware/auth.middleware.js";
import { completeHabit, createHabit, getHabits } from "../controllers/habit.controler.js";

const router = express.Router();

router.post("/", authMiddleware, createHabit);
router.get("/",  authMiddleware, getHabits);
router.post("/complete", authMiddleware, completeHabit);

export default router;