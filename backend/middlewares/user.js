require('dotenv').config();
const jwt = require('jsonwebtoken')

const middlewares = (req,res,next)=>{
    const authHeaders = req.headers.authorization?.split('')[1];

    if(!authHeaders){
        return res.json({
            message: "token not found"
        })
    }
    try{
        let decodedToken = jwt.verify(authHeaders, process.env.JWT_SECRET)
        if(decodedToken.userId){
            req.userId = decodedToken.userId
            next()
        }
        else{
            return res.json({
                message: "user not found"
            })
        }
    }catch(error){
        console.log(error)
        return res.status(403).json({
            msg: 'error'
        })
    }
}

module.exports = middlewares;