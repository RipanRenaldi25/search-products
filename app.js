import express from 'express';
import dotenv from 'dotenv';
import SearchRouter from './src/routes/SearchRouter.js';
import cors from 'cors';
import amqplib from 'amqplib';
import Products from './src/model/Products.js';
dotenv.config();

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json('application/json'));
app.use(cors(process.env.CORS_URL1));
app.use(SearchRouter);

const consume = async () => {
    // make sure all exchange, queue is Exist
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const que = await channel.assertQueue('getProducts');
    //
    console.log('Wait For Messages');
    channel.consume(que.queue, async msg => {
        const message = JSON.parse(msg.content.toString());
        const {product, logType} = message;

        console.log(product);
        console.log(logType);
        if( logType && (logType === 'create') ){
            await Products.create(product);
        }else if(logType && (logType === 'update')){
            await Products.update(product, {where: {
                id: product.id
            }});
        }else if( logType && (logType === 'delete') ){
            await Products.destroy({where: {id: product.id}});
        }
        channel.ack(msg);
    })
    
}
consume();

app.listen(parseInt(process.env.PORT), ()=>{
    console.log(`Server Listen on PORT ${process.env.PORT}`);
})

export default app;