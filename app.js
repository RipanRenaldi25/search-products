import express from 'express';
import dotenv from 'dotenv';
import SearchRouter from './src/routes/SearchRouter.js';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(SearchRouter);

app.listen(parseInt(process.env.PORT), ()=>{
    console.log(`Server Listen on PORT ${process.env.PORT}`);
})