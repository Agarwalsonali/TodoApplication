const express = require('express')
const router = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken')
const middleware = require('../middlewares/user')
const { User } = require('../db');
const { JWT_SECRET } = require('../config')

const signupValidation = zod.object({
    username:zod.string().email('enter the correct email'),
    password: zod.string().min(6, 'Password must be at least 6 characters long'),
    firstName:zod.string(),
    lastName:zod.string()
})

router.post('/signup',async(req,res)=>{
    const body = req.body; 
    
    const result =  signupValidation.safeParse(body);
    if(!result.success)
        {
            
            return res.json({
                message:result.error.errors
            })
        }
    //check this user is not present in this application already
    const user = await User.findOne({
        username : body.username
    })
    if(user)
    {
        return res.json({
            Message:"this user already exist"
        })
    }
    //otherwise create the user
    const dbuser = await User.create(body);
    // console.log(dbuser);
    

    
    const token = jwt.sign({
        userId:dbuser._id
    },JWT_SECRET)
    res.json({
        message:"user created successfully",
        token:token
    }) 

  
})

const signinValidation = zod.object({
    username:zod.string().email(),
    password: zod.string().min(6, 'Password must be at least 6 characters long'),
})

router.post('/signin',async(req,res)=>{
    const body = req.body;
    
    
    const { success } = signinValidation.safeParse(body);
    if(!success)
    {
        return res.status(400).json({
            message:"Incorrect inputs / validation failed in signin..."
        })
    }

    const user = await User.findOne({
        username:body.username,
        password:body.password
    })

  
    if(user)
    {
        const token = jwt.sign({
            userId:user._id,
        },JWT_SECRET)
        return res.json({
            token:token
        })
    }

    return res.status(411).json({
        message:"User doesn't exist with this username"
    })


})


const updateUserSchema = zod.object({
    password: zod.string().min(6),
    firstName:zod.string(),
    lastName:zod.string()
})


router.put('/:id',middleware,async(req,res)=>{
    const body = req.body;
    console.log(body);
    
    const { success } = updateUserSchema.safeParse(body);
   
    
    if(!success)
    {
          return res.status(400).json({
              message: "Error while updating information"
            });
        
    }
    // update the userschema
 
    
    await User.updateOne(
        { _id: req.params.id }, 
        {   password:body.password,
            firstName:body.firstName,
            lastName:body.lastName
         } 
    );
    
    res.json({
        id: req.params.id,
        message: "Updated successfully"
      });
        

})


module.exports = router;