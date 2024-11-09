import pool from "../config/database.js";

export async function getStandarDK(req, res) {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM standards WHERE id = (SELECT MAX(id) FROM standards)"
        );
        const obj = { ...rows[0] };
        res.json(obj);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send("Something broke!");
    }
}
export async function putStandarDK(req, res) {
    const { loaicauthu, age_min, age_max, num_max, num_min, foreign_max } =
        req.body.message;
    const { username, password } = req.body.info;
    try {
        const [[rows]] = await pool.query(
            `SELECT * FROM admin WHERE username = ? AND password = ?`,
            [username, password]
        );
        if (rows) {
            const x = await pool.query(
                `INSERT INTO standards (loaicauthu, age_min, age_max, num_max, num_min, foreign_max) VALUES (?, ?, ?, ?, ?, ?)`,
                [loaicauthu, age_min, age_max, num_max, num_min, foreign_max]
            );
            res.status(201).json(x);
        } else {
            res.status(401).json("Login failure");
        }
    } catch (err) {
        console.error(err.stack);
        res.status(500).send("Something broke!");
    }
}
