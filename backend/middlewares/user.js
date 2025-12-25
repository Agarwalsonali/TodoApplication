const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config')

const middleware = (req,res,next)=>{
    const authHeaders = req.headers.authorization?.split(' ')[1]; // Bearer token

//    console.log("Token is:",authHeaders);
   
    if(!authHeaders)
    {
        return res.json({
            message:"token not found"
        })
    }
    // console.log(authHeaders);
    
    
   
    
    try{
        
        let decodedToken = jwt.verify(authHeaders, JWT_SECRET);
        console.log(decodedToken);
        console.log(decodedToken.userId);
        
        if(decodedToken.userId)
        {
            req.userId = decodedToken.userId;
            next();
        }
        else
        {
            return res.json({
                message:"User not found"
            })
        }
    }
    catch(err)
    {
        //console.log(decodedToken);
        
        return res.status(404).json({
            msg:"error"
        })
    }

        
}
module.exports = middleware;
   
    


