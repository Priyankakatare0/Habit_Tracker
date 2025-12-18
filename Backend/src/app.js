import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import habitRoutes from "./routes/habit.routes.js";
import authRoutes from "./routes/auth.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/habits",habitRoutes);


app.listen(3000, () => {
    console.log("Server is running on 3000");
});