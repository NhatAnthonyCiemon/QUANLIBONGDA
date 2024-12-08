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
        if (
            !loaicauthu ||
            !age_min ||
            !age_max ||
            !num_max ||
            !num_min ||
            !foreign_max
        ) {
            res.status(400).json("Missing information");
            return;
        }
        if (age_min > age_max || num_min > num_max) {
            res.status(400).json("Invalid information");
            return;
        }
        const [[rows]] = await pool.query(
            `SELECT * FROM admin WHERE username = ? AND password = ?`,
            [username, password]
        );
        if (rows) {
            const [[rows]] = await pool.query(
                "SELECT * FROM standards WHERE id = (SELECT MAX(id) FROM standards)"
            );

            const x = await pool.query(
                `INSERT INTO standards (loaicauthu, age_min, age_max, num_max, num_min, foreign_max,max_goal_time,min_goal_time,win_score,lose_score,draw_score) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?)`,
                [
                    loaicauthu,
                    age_min,
                    age_max,
                    num_max,
                    num_min,
                    foreign_max,
                    rows.max_goal_time,
                    rows.min_goal_time,
                    rows.win_score,
                    rows.lose_score,
                    rows.draw_score,
                ]
            );
            let loaicauthu_arr = loaicauthu.split(",");
            for (let i = 0; i < loaicauthu_arr.length; i++) {
                const [[exists]] = await pool.query(
                    `SELECT * FROM player_type WHERE type_name = ?`,
                    [loaicauthu_arr[i]]
                );
                if (!exists) {
                    await pool.query(
                        `INSERT INTO player_type (type_name) VALUES (?)`,
                        [loaicauthu_arr[i]]
                    );
                }
            }
            res.status(201).json(x);
        } else {
            res.status(401).json("Login failure");
        }
    } catch (err) {
        console.error(err.stack);
        res.status(500).send("Something broke!");
    }
}

export async function putStandarDK1(req, res) {
    try {
        const { win_score, lose_score, draw_score } = req.body.message;
        if (!(win_score > draw_score && draw_score > lose_score)) {
            res.status(400).json("Invalid information");
            return;
        }
        const { username, password } = req.body.info;
        const [[rows]] = await pool.query(
            `SELECT * FROM admin WHERE username = ? AND password = ?`,
            [username, password]
        );
        if (rows) {
            const [[rows_]] = await pool.query(
                "SELECT * FROM standards WHERE id = (SELECT MAX(id) FROM standards)"
            );
            const x = await pool.query(
                `INSERT INTO standards (win_score, lose_score, draw_score,loaicauthu, age_min, age_max, num_max, num_min, foreign_max,max_goal_time,min_goal_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
                [
                    win_score,
                    lose_score,
                    draw_score,
                    rows_.loaicauthu,
                    rows_.age_min,
                    rows_.age_max,
                    rows_.num_max,
                    rows_.num_min,
                    rows_.foreign_max,
                    rows_.max_goal_time,
                    rows_.min_goal_time,
                ]
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
