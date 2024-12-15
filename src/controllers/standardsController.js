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
                `INSERT INTO standards (loaicauthu, age_min, age_max, num_max, num_min, foreign_max,max_goal_time,min_goal_time,win_score,lose_score,draw_score,goal_type) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?,?)`,
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
                    rows.goal_type,
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
                `INSERT INTO standards (win_score, lose_score, draw_score,loaicauthu, age_min, age_max, num_max, num_min, foreign_max,max_goal_time,min_goal_time, goal_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`,
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
                    rows_.goal_type,
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

export async function getGoalTypes(req, res) {
    try {
        // Truy vấn cột goal_type từ bảng standard
        const [[rows]] = await pool.query(
            "SELECT * FROM standards WHERE id = (SELECT MAX(id) FROM standards)"
        );

        // Tách dữ liệu bằng dấu phẩy và lưu vào mảng
        let goalTypesArray = rows.goal_type.split(",");
        goalTypesArray = goalTypesArray.map((item) => item.trim());

        // Trả về mảng dữ liệu
        res.send(goalTypesArray);
    } catch (err) {
        console.error(err);
        res.status(500).send("Something broke!");
    }
}

export async function getMaxGoalTime(req, res) {
    try {
        // Truy vấn cột goal_type từ bảng standard
        const [[rows]] = await pool.query(
            "SELECT * FROM standards WHERE id = (SELECT MAX(id) FROM standards)"
        );
        // Trả về mảng dữ liệu
        res.send(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Something broke!");
    }
}

export async function updateGoalType(req, res) {
    const { goalTypesString } = req.body; // Nhận goalTypesString từ yêu cầu và gán id mặc định là 18 nếu không có id
    try {
        // Tách chuỗi goal_type thành mảng các phần tử và ghép lại thành chuỗi
        const goalTypesArray = goalTypesString
            .split(",")
            .map((item) => item.trim())
            .join(", ");

        const [[rows]] = await pool.query(
            "SELECT * FROM standards WHERE id = (SELECT MAX(id) FROM standards)"
        );
        const id = rows.id;

        const [updateResult] = await pool.query(
            `UPDATE standards 
            SET goal_type = ? 
            WHERE id = ?`, // Cập nhật cột goal_type
            [goalTypesArray, id]
        );

        if (updateResult.affectedRows === 0) {
            return res.status(404).send("Goal type not found.");
        }

        res.status(200).end(); // Trả về phản hồi thành công
    } catch (err) {
        console.error(err.stack);
        res.status(500).send("Something went wrong!");
    }
}

export async function updateMaxGoalTime(req, res) {
    const { maxGoalTime } = req.body; // Nhận giá trị maxGoalTime từ yêu cầu
    try {
        const [[rows]] = await pool.query(
            "SELECT * FROM standards WHERE id = (SELECT MAX(id) FROM standards)"
        );
        const id = rows.id;
        const [updateResult] = await pool.query(
            `UPDATE standards 
            SET max_goal_time = ? 
            WHERE id = ?`, // Cập nhật cột max_goal_time cho id = 18 (hoặc giá trị id khác nếu cần)
            [maxGoalTime, id]
        );

        if (updateResult.affectedRows === 0) {
            return res.status(404).send("Max goal time not updated.");
        }

        res.status(200).end(); // Trả về phản hồi thành công
    } catch (err) {
        console.error(err.stack);
        res.status(500).send("Something went wrong!");
    }
}
