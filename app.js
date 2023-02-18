import express from 'express';
import dotenv from 'dotenv';
import SearchRouter from './src/routes/SearchRouter.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json('application/json'));
app.use(cors(process.env.CORS_URL1));
app.use(SearchRouter);

app.listen(parseInt(process.env.PORT), ()=>{
    console.log(`Server Listen on PORT ${process.env.PORT}`);
})