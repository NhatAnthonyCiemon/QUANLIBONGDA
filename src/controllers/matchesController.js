import  pool  from '../config/database.js';

export async function getMatches(req, res){
    try{
        const [rows] = await pool.query(`SELECT t1.team_name as team1name, t2.team_name as team2name, ms.match_time, ms.stadium, ms.season,ms.round
                                         FROM match_schedule ms, team t1, team t2
                                         where ms.team_1 = t1.team_id and ms.team_2 = t2.team_id
                                         `);
        res.send(rows);
    }catch(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
}