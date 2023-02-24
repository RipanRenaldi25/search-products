import { caching } from 'cache-manager';
let memory = await caching('memory', {
    max: 100,
    ttl: 1000 * 10
})
const cache = duration => async (req, res, next) => {
    try{
        if(req.method !== "GET"){
            return next();
        }
        const key = req.originalUrl;
        const cacheValue = await memory.get(key);
        if( cacheValue ){
            console.log(`Cache ${key} hit`);
            res.send(cacheValue);
        }else{
            res.originalSend = res.send;
            res.send = async body => {
                res.originalSend(body);
                await memory.set(key, body, duration);
            }
            next();
        }
    }catch(e){
        console.log(e.message);
    }
}
export default cache;
