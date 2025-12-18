import pool from "../config/db.js";

export const createHabit = async (req, res) => {
    const { name, frequency, category } = req.body;
    const userId = req.userId;

    try {
        const result = await pool.query(
            `INSERT INTO habits (user_id, name, frequency, category)
            VALUES ($1,$2, $3, $4)
            RETURNING *`,
            [userId, name, frequency, category]
        );
        return res.status(201).json({ message: "Habit created", habit: result.rows[0] })
    }
    catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const getHabits = async (req, res) => {
    const userId = req.userId;

    try {
        const result = await pool.query(
            `
            SELECT * FROM habits WHERE user_id = $1 ORDER BY created_at DESC `,
            [userId]
        );
        return res.status(200).json(result.rows);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const completeHabit = async (req, res) => {
    const {habitId} = req.body;

    try{
        await pool.query(
            `INSERT INTO habit_completions (habit_id, completion_date)
            VALUES ($1, CURRENT_DATE)
            ON CONFLICT DO NOTHING`,
            [habitId]
        );
        return res.status(200).json({message: "Habit marked as completed"});
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({message:"server error"});
    }
}
