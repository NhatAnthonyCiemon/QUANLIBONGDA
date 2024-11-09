import pool from "../config/database.js";

export async function login(req, res) {
    if (!req.body) {
        return res.status(400).json("Request body is missing");
    }
    const { username, password } = req.body;

    try {
        let result;
        const [[rows]] = await pool.query(
            `SELECT * FROM admin WHERE username = ? AND password = ?`,
            [username, password]
        );
        if (rows) {
            result = "Login success";
            res.status(200).json(result);
        } else {
            result = "Login failure";
            res.status(401).json(result);
        }
    } catch (err) {
        console.error(err.stack);
        res.status(500).json("Something broke!");
    }
}
