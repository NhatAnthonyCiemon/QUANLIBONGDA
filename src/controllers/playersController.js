import  pool  from '../config/database.js';

export async function getPlayers(req, res){
    try{
        const [rows] = await pool.query('SELECT * FROM players');
        res.send(rows);
    }catch(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
    // const [rows] = await pool.query('SELECT * FROM players');
    // return rows;
}

export async function getPlayerById(req, res){
    const id = req.params.id;
    try{
        const [rows] = await pool.query(`SELECT * FROM players WHERE id = ?`, [id]);
        res.send(rows[0]);
    }catch(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
    // const [rows] = await pool.query(`SELECT * FROM players WHERE id = ?`, [id]);
    // return rows[0];
}

export async function createPlayer(req, res){
    const { player_name, birth_date, player_type, team, note } = req.body; // middleware express.json() is used to parse the body of the request
    try{
        const [result] = await pool.query(`INSERT INTO players (player_name, birth_date, player_type, team, note) 
        VALUES (N?, ?, N?, ?, N?)`, [player_name, birth_date, player_type, team, note]);
       
        const id = result.insertId;
        const [rows] = await pool.query(`SELECT * FROM players WHERE id = ?`, [id]);
        res.status(201).send(rows[0]);
    }
    catch(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
    // const [result] = await pool.query(`INSERT INTO players (player_name, birth_date, player_type, team, note) 
    //     VALUES (N?, ?, N?, ?, N?)`, [player_name, birth_date, player_type, team, note]);
       
    // const id = result.insertId;
    // return getPlayerById(id);
}