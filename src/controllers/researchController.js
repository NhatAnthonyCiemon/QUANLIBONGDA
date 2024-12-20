import pool from "../config/database.js";

export async function getPlayers(req, res) {
    try {
        let [[currentSeason]] = await pool.query(
            "SELECT season FROM season WHERE EXISTS (SELECT * FROM match_schedule WHERE season = season.season)"
        );
        let season = currentSeason.season;
        const [rows] = await pool.query(
            `
            SELECT p.player_name, t.team_name, p.player_type, COUNT(CASE WHEN g.goal_type != 'phản lưới' THEN 1 ELSE NULL END) AS total_goals
            FROM player AS p
            INNER JOIN team AS t ON p.team_id = t.team_id
            LEFT JOIN goal AS g ON p.player_id = g.player_id
            WHERE t.season = ?
            GROUP BY p.player_id, p.player_name, t.team_name, p.player_type;
        `,
            [season]
        );
        rows.sort((a, b) => a.team_name - b.team_name);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ error: "Something broke!" });
    }
}

export async function getPlayerHasGoal(req, res) {
    try {
        const [rows] = await pool.query(`
            SELECT p.player_name, t.team_name, p.player_type, COUNT(g.goal_type) AS total_goals
            FROM player AS p
            INNER JOIN team AS t ON p.team_id = t.team_id
            LEFT JOIN goal AS g ON p.player_id = g.player_id
            WHERE g.goal_type IS NOT NULL AND g.goal_type != 'phản lưới'
            GROUP BY p.player_id, p.player_name, t.team_name, p.player_type;
        `);
        rows.sort((a, b) => b.total_goals - a.total_goals);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ error: "Something broke!" });
    }
}

let poit_per_win = 3;
let point_per_draw = 1;
let point_per_lose = 0;

function compare(result) {
    result = result.replace(/\s+/g, "");
    const arr = result.split("-");
    if (arr[0] > arr[1]) {
        return poit_per_win;
    } else if (arr[0] < arr[1]) {
        return point_per_lose;
    } else {
        return point_per_draw;
    }
}

function numberdifference(result) {
    result = result.replace(/\s+/g, "");
    const arr = result.split("-");
    return arr[0] - arr[1];
}
function getGoal(result) {
    result = result.replace(/\s+/g, "");
    const arr = result.split("-");
    return parseInt(arr[0]);
}

async function getConfront(team1, team2) {
    const [[row_1]] = await pool.query(
        `SELECT result
        FROM match_schedule
        WHERE team_1 = ? AND team_2 = ? AND result IS NOT NULL`,
        [team1, team2]
    );
    const [[row_2]] = await pool.query(
        `SELECT result
        FROM match_schedule
        WHERE team_1 = ? AND team_2 = ? AND result IS NOT NULL`,
        [team2, team1]
    );
    let nums_goal_1 = getGoal(row_1.result) + getGoal(row_2.result);
    let nums_goal_2 = getGoal(row_2.result) + getGoal(row_1.result);
    return nums_goal_2 - nums_goal_1;
}

export async function getTeam(req, res) {
    try {
        const [[standards]] = await pool.query(
            "SELECT * FROM standards WHERE id = (SELECT MAX(id) FROM standards)"
        );
        poit_per_win = standards.win_score;
        point_per_draw = standards.draw_score;
        point_per_lose = standards.lose_score;
        // let [[currentSeason]] = await pool.query(
        //     "SELECT season FROM season WHERE EXISTS (SELECT * FROM match_schedule WHERE season = season.season)"
        // );
        // let season = currentSeason.season;
        // const [rows] = await pool.query(
        //     `SELECT team_id FROM team WHERE season = ?`,
        //     [season]
        // );
        let [rows] = await pool.query(`SELECT team_id FROM team`);
        const teams = rows.map((team) => team.team_id);
        const data = [];
        const confrontMap = {};
        for (let i = 0; i < teams.length; i++) {
            const team = teams[i];
            const [rows] = await pool.query(
                `
                SELECT MS.result, MS.team_1, MS.team_2
                FROM match_schedule AS MS
                WHERE (MS.team_1 = ? OR MS.team_2 = ?) AND MS.result IS NOT NULL
            `,
                [team, team]
            );
            let point = 0;
            let total_goal = 0;
            let win = 0;
            let draw = 0;
            let lose = 0;
            let difference = 0;
            rows.forEach((row) => {
                const result = row.result;
                if (row.team_1 !== team) {
                    row.result = row.result.split("-").reverse().join("-");
                }
                point += compare(row.result);
                difference += numberdifference(row.result);
                const match = row.team_1 + "-" + row.team_2;
                if (!confrontMap[match]) {
                    confrontMap[match] = numberdifference(result);
                }
                total_goal += getGoal(row.result);
                if (compare(row.result) === poit_per_win) {
                    win++;
                } else if (compare(row.result) === point_per_draw) {
                    draw++;
                } else {
                    lose++;
                }
            });

            const [[rows1]] = await pool.query(
                "SELECT team_name From team WHERE team_id = ?",
                [team]
            );

            data.push({
                team_id: team,
                team_name: rows1.team_name,
                difference,
                point,
                win,
                draw,
                lose,
                total_goal,
            });
        }
        data.sort((a, b) => {
            if (a.point === b.point) {
                if (a.difference === b.difference) {
                    if (a.total_goal === b.total_goal) {
                        return (
                            confrontMap[b.team_id + "-" + a.team_id] -
                            confrontMap[a.team_id + "-" + b.team_id]
                        );
                    }
                    return b.total_goal - a.total_goal;
                }
                return b.difference - a.difference;
            }
            return b.point - a.point;
        });

        res.status(200).json(data);
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ error: "Something broke!" });
    }
}
