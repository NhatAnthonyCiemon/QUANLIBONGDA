    import  pool  from '../config/database.js';

    export async function getMatches(req, res){
        try{
            const [rows] = await pool.query(`SELECT t1.team_name as team1name, t2.team_name as team2name, ms.match_time, ms.stadium, ms.season,ms.round, ms.result,ms.schedule_id
                                            FROM match_schedule ms, team t1, team t2
                                            where ms.team_1 = t1.team_id and ms.team_2 = t2.team_id
                                            `);
            res.send(rows);
        }catch(err){
            console.error(err.stack);
            res.status(500).send('Something broke!');
        }
    }

    export async function updateMatchResult(req, res) {
        const { schedule_id, result } = req.body.matchData; // Nhận giá trị result từ yêu cầu
        const { username, password } = req.body.info;
        console.log(username);
        console.log(password);
        const [[rows]] = await pool.query(
            `SELECT * FROM admin WHERE username = ? AND password = ?`,
            [username, password]
        );
        console.log(rows);
        console.log("id tran dau"+schedule_id);
        try {
            if (!rows) {
                console.log("Unauthorized");
                return res.status(401).send("Unauthorized");
            }
            const [updateResult] = await pool.query(
                `UPDATE match_schedule 
                SET result = ?
                WHERE schedule_id = ?`, // Cập nhật cột result
                [result, schedule_id]
            );
            console.log(updateResult);
            if (updateResult.affectedRows === 0) {
                return res.status(404).send("Match not found.");
            }

            res.status(200).end();
        } catch (err) {
            console.error(err.stack);
            res.status(500).send("Something went wrong!");
        }
    }

