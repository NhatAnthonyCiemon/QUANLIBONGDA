import  pool  from '../config/database.js';

export async function getSeasons(req, res){
    try{
        const [rows] = await pool.query('SELECT season FROM season');
        res.send(rows);
    }catch(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
}