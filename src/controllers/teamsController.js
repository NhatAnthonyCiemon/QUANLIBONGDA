import pool from "../config/database.js";

export async function getTeams(req, res) {
    try {
        const [rows] = await pool.query("SELECT * FROM teams");
        res.send(rows);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send("Something broke!");
    }
}

export async function getTeamById(req, res) {
    const id = req.params.id;
    try {
        const [rows] = await pool.query(`SELECT * FROM teams WHERE id = ?`, [
            id,
        ]);
        res.send(rows[0]);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send("Something broke!");
    }
}

export async function createTeam(req, res) {
    const { team_name, stadium, email } = req.body;
    console.log(req.body);
    try {
        const [result] = await pool.query(
            `INSERT INTO teams (team_name,stadium, email) VALUES (N?, ?,?)`,
            [team_name, stadium, email]
        );
        const id = result.insertId;
        res.status(201).json(id);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send("Something broke!");
    }

    // const [result] = await pool.query(`INSERT INTO teams (team_name, email) VALUES (N?, ?)`, [name, email]);
    // const id = result.insertId;
    // return getTeamById(id);
}
