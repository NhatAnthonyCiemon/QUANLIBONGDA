import pool from "../config/database.js";

export async function getTeams(req, res) {
    try {
        const [rows] = await pool.query("SELECT * FROM team");
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
    try {
        const [[season_table]] = await pool.query(
            "SELECT * FROM season WHERE NOT EXISTS ( SELECT 1 FROM match_schedule WHERE season.season = match_schedule.season )"
        );
        if (!season_table) {
            return res.status(400).send("No season available");
        }
        const season = season_table.season;
        const [[numsTeam]] = await pool.query(
            `SELECT COUNT(*) as num FROM team WHERE season = ?`,
            [season]
        );
        if (numsTeam.num > 5) {
            return res.status(400).send("Max teams reached");
        }
        const [result] = await pool.query(
            `INSERT INTO team (team_name,home_stadium, email,season) VALUES (N?, ?,?,?)`,
            [team_name, stadium, email, season]
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
