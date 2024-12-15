import  pool  from '../config/database.js';

export async function getGoals(req, res){
    try{
        const [rows] = await pool.query(`SELECT 
    ms.schedule_id,
    ms.round,
    g.goal_type, 
    g.goal_time,
    p.player_id, 
    p.player_name,
    p.ao_number, 
    t.team_name
FROM 
    goal g
JOIN 
    match_schedule ms ON g.schedule_id = ms.schedule_id
JOIN 
    player p ON g.player_id = p.player_id
JOIN 
    team t ON p.team_id = t.team_id;`);
        res.send(rows);
    }catch(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
}

/// Hàm API để cập nhật bảng goal
export async function updateGoalPlayerList(req, res) {
    const { match_id, goalData } = req.body; // Nhận match_id và goalData từ yêu cầu
    const { username, password } = req.body.info;
    const [[rows]] = await pool.query(
        `SELECT * FROM admin WHERE username = ? AND password = ?`,
        [username, password]
    );
    console.log(match_id);
    console.log(goalData);
    console.log(rows);
    try {
        if (!rows) {
            return res.status(401).send("Unauthorized");
        }
        // Bước 1: Duyệt qua từng goalData và cập nhật vào bảng goal
        for (let i = 0; i < goalData.length; i++) {
            const name= goalData[i][1];
            const number= goalData[i][2];
            const team= goalData[i][3];
            const goal_type= goalData[i][4];
            const goal_time= goalData[i][5];


            // Tìm team_id từ tên đội
            const [teamData] = await pool.query(
                `SELECT team_id FROM team WHERE team_name = ?`, 
                [team]
            );

            if (teamData.length == 0) {
                return res.status(404).send(`Team ${team} not found!`);
            }

            const team_id = teamData[0].team_id;
            console.log(team_id);

            // Tìm player_id từ bảng player dựa trên tên cầu thủ và team_id
            const [playerData] = await pool.query(
                `SELECT player_id FROM player WHERE player_name = ? AND team_id = ? AND ao_number=?`, 
                [name, team_id, number]
            );

            if (playerData.length == 0) {
                return res.status(404).send(`Player ${name} from team ${team} not found!`);
            }

            const player_id = playerData[0].player_id;
            console.log(player_id);
            // Bước 2: Cập nhật hoặc thêm mới vào bảng goal
            const [existingGoal] = await pool.query(
                `SELECT * FROM goal WHERE schedule_id = ? AND player_id = ? AND goal_time = ?`, 
                [match_id, player_id, goal_time]
            );
            console.log(existingGoal);
            if (existingGoal.length > 0) {
                // Cập nhật loại bàn thắng nếu đã có
                await pool.query(
                    `UPDATE goal SET goal_type = ? WHERE schedule_id = ? AND player_id = ? AND goal_time = ?`,
                    [goal_type, match_id, player_id, goal_time]
                );
            } else {
                // Thêm mới cầu thủ vào bảng goal nếu chưa có
                await pool.query(
                    `INSERT INTO goal (schedule_id, player_id, goal_type, goal_time) VALUES (?, ?, ?, ?)`,
                    [match_id, player_id, goal_type, goal_time]
                );
            }
        }

        // Bước 3: Xóa những cầu thủ không có trong goalData
        // Lấy tất cả các cầu thủ trong bảng goal cho match_id hiện tại
        const [existingGoals] = await pool.query(
            `SELECT g.player_id, g.goal_time, p.player_name, p.ao_number, t.team_name 
             FROM goal g
             JOIN player p ON g.player_id = p.player_id
             JOIN team t ON p.team_id = t.team_id
             WHERE g.schedule_id = ?`, 
            [match_id]
        );
        console.log(existingGoals);
        // Tạo danh sách player_id và goal_time từ goalData
        const goalDataPlayers = goalData.map(goal => {
            const name= goal[1];
            const number=goal[2];
            const team= goal[3];
            const goal_time= goal[5];
            return { name, number, team, goal_time };
        });
        console.log(goalDataPlayers);
        // Duyệt qua các goal hiện có và xóa nếu không tồn tại trong goalData
        for (let i = 0; i < existingGoals.length; i++) {
            const existingGoal = existingGoals[i];
            //fix
            const goalExistsInGoalData = goalDataPlayers.some((goal) => {
                return (
                    parseInt(goal.goal_time) === existingGoal.goal_time &&
                    goal.name.trim().toLowerCase() === existingGoal.player_name.trim().toLowerCase() &&
                    parseInt(goal.number) === existingGoal.ao_number &&
                    goal.team.trim().toLowerCase() === existingGoal.team_name.trim().toLowerCase()
                );
            });
            
            console.log(goalExistsInGoalData);
            if (!goalExistsInGoalData) {
                // Nếu không tồn tại trong goalData, xóa khỏi bảng goal
                await pool.query(
                    `DELETE FROM goal WHERE schedule_id = ? AND player_id = ? AND goal_time = ?`,
                    [match_id, existingGoal.player_id, existingGoal.goal_time]
                );
            }
        }

        res.status(200).send('Goal data updated and deleted successfully!');
    } catch (err) {
        console.error(err.stack);
        res.status(500).send("Something went wrong!");
    }
}
