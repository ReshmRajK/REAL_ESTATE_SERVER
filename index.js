require('dotenv').config()
const express=require('express')

const server=express()
const cors=require('cors')
const router=require('./Routes/routing')

require('./DB/connection')
server.use(express.json())
server.use(cors())
server.use(router)

const PORT=3000
server.listen(PORT,()=>{
    console.log(`server runs at port ${PORT}`);
    
})

//already available error - middleware
server.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })

})