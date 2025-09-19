import 'dotenv/config';
import connectDB from './db/db.js';
import app from './app.js';


connectDB()
.then(()=>{
    app.listen(process.env.port,()=>{
        console.log(`SERVER IS RUNNING AT PORT: ${process.env.port}`)
    })
})
.catch((err)=>{
    console.log("MONGODB CONNECTION FAILED",err)
})