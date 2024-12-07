import pool from "../config/database.js";

export async function getPlayers(req, res) {
    try {
        const [rows] = await pool.query(`SELECT *  FROM player`);
        res.send(rows);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send("Something broke!");
    }
}

export async function getPlayerById(req, res) {
    const id = req.params.id;
    try {
        const [rows] = await pool.query(
            `SELECT * FROM player WHERE player_id = ?`,
            [id]
        );
        res.send(rows[0]);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send("Something broke!");
    }
    // const [rows] = await pool.query(`SELECT * FROM players WHERE id = ?`, [id]);
    // return rows[0];
}

export async function createPlayer(req, res) {
    const {
        player_name,
        birth_date,
        player_type,
        team_id,
        ao_number,
        note,
        pos,
    } = req.body; // middleware express.json() is used to parse the body of the request

    try {
        let [player_types] = await pool.query(`SELECT * FROM player_type`);
        player_types = player_types.map((player_type) => player_type.type_name);
        let [[teams]] = await pool.query(
            `SELECT * FROM team where team_id = ?`,
            [team_id]
        );
        if (!teams) {
            console.log("team not found");
            return res.status(400).send("Team not found");
        }
        if (!player_types.includes(player_type)) {
            console.log("player type not found");
            return res.status(400).send("Player type not found");
        }

        const [[row]] = await pool.query(
            "SELECT * FROM standards WHERE id = (SELECT MAX(id) FROM standards)"
        );
        if (
            row.age_max <
            new Date().getFullYear() - new Date(birth_date).getFullYear()
        ) {
            console.log("Player is too old");
            return res.status(400).send("Player is too old");
        }
        if (
            row.age_min >
            new Date().getFullYear() - new Date(birth_date).getFullYear()
        ) {
            console.log("Player is too young");
            return res.status(400).send("Player is too young");
        }
        const [[numsPlayers]] = await pool.query(
            `SELECT COUNT(*) as count FROM player WHERE team_id = ?`,
            [team_id]
        );
        if (numsPlayers.count >= row.num_max) {
            console.log("Team is full");
            return res.status(400).send("Team is full");
        }
        console.log(pos);
        if (pos === "last") {
            if (numsPlayers.count < row.num_min - 1) {
                console.log("Team is not enough players");
                console.log(row.num_min);
                console.log(numsPlayers.count);
                return res.status(400).send("Team is not enough players");
            }
        }
        if (player_type === "Nước ngoài") {
            console.log("foreign player");
            const [[numsForeign]] = await pool.query(
                `SELECT COUNT(*) as count FROM player WHERE team_id = ? AND player_type = 'Nước ngoài'`,
                [team_id]
            );
            if (numsForeign.count > row.foreign_max) {
                return res.status(400).send("Team is full foreign players");
            }
        }
        const [result] = await pool.query(
            `INSERT INTO player (player_name, birth_date, player_type, team_id, ao_number, note) 
        VALUES (N?, ?, N?, ?, ?,N?)`,
            [player_name, birth_date, player_type, team_id, ao_number, note]
        );
        const id = result.insertId;
        const [rows] = await pool.query(
            `SELECT * FROM player WHERE player_id = ?`,
            [id]
        );
        res.status(201).send(rows[0]);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send("Something broke!");
    }
    // const [result] = await pool.query(`INSERT INTO players (player_name, birth_date, player_type, team, note)
    //     VALUES (N?, ?, N?, ?, N?)`, [player_name, birth_date, player_type, team, note]);

    // const id = result.insertId;
    // return getPlayerById(id);
}
