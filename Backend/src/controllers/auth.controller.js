import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        const existingUser = await pool.query(`
            SELECT id FROM users WHERE email = $1 OR username = $2`,
            [email, username]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: "User already exist, please login" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            `INSERT INTO users (username, email, password)
             VALUES ($1, $2, $3)
             RETURNING id, username, email`,
            [username, email, hashedPassword]
        );

        return res.status(201).json({
            message: "User regiesterd successfully",
            user: newUser.rows[0],
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// LOGIN
export const login = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const result = await pool.query(
        `SELECT id, email, password FROM users WHERE email = $1`,
        [email]
    );
        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Password is incorrect" });
        }

        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET, 
            {expiresIn: "3d"}
        );

        return res.status(200).json({ message: "Login successful", token })
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err })
    }
};