import  pool  from '../config/database.js';

export async function getGoals(req, res){
    try{
        const [rows] = await pool.query(`SELECT g.goal_type, g.goal_time, p.player_name,t.team_name
                                         FROM goal g, match_schedule ms, player p, team t
                                         where g.schedule_id = ms.schedule_id and g.player_id = p.player_id and p.team_id = t.team_id
                                         `);
        res.send(rows);
    }catch(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
}