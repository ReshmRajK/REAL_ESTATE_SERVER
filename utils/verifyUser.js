const jwt=require('jsonwebtoken')
const { errorHandler } = require('./error')

exports.verifyToken=async(req,res,next)=>{
    const token=req.cookies.access_token

    if(!token) return next(errorHandler(401,'Unauthorized'))
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
          
              if(err) return next(errorHandler(403,'forbidden'))
            
                req.user=user
                
                next()
        }
    )  

}



