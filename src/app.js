import express from 'express';
import dotenv from 'dotenv';
import teamsRouter from '../src/routes/teams.js';
import playersRouter from '../src/routes/players.js';

dotenv.config();
const app = express();
app.use(express.json());

//Static files
app.use(express.static('../src/public'));

//Routes
app.use('/Teams', teamsRouter);
app.use('/Players', playersRouter);

//Middleware handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
});