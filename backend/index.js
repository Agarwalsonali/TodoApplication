require('dotenv').config();
const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { User } = require('./db/index.js');
const { Todo } = require('./db/index.js')
const middlewares = require('./middlewares/user.js');

const app = express();
app.use(express.json());


const signupValidation = zod.object({
    username: zod.email('enter the valid email'),
    password: zod.string().min(6,'Password must be atleast 6 characters long')
})

app.post("/api/v1/user/signup", async (req,res)=>{
    const body = req.body;
    console.log(body)
    const result = signupValidation.safeParse(body);

    if(!result.success){
        return res.json({
            message: result.error.errors
        })
    }
    const user = await User.findOne({
        username: body.username
    })
    if(user){
        return res.json({
            message: "this user already exist"
        })
    }
    const dbuser = await User.create(body);
    const token = jwt.sign({
        userId: dbuser._id
    },process.env.JWT_SECRET)
    res.json({
        message: 'user created successfully',
        token: token
    })
})

const signinValidation = zod.object({
    username: zod.email('enter the valid email'),
    password: zod.string().min(6,'Password must be atleast 6 characters long')
})

app.post('/api/v1/user/signin', async (req,res)=>{
    const body = req.body;

    const { success } = signinValidation.safeParse(body);

    if(!success){
        res.josn({
            message: "Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: body.username,
        password: body.password
    })

    if(user){
        const token = jwt.sign({
            userId: user._id
        },process.env.JWT_SECRET)
        return res.json({
            token: token
        })
    }
    return res.status(411).json({
        message: "user doesn't exist with this username"
    })
})

const updateUserSchema = zod.object({
    username: zod.email('enter the valid email'),
    password: zod.string().min(6,'Password must be atleast 6 characters long')
})

app.put('/api/v1/user/:id', middlewares, async(req,res)=>{
    const body = req.body;

    const { success } = updateUserSchema.safeParse(body)

    if(!success){
        return res.status(400).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne({
        _id: req.params.id
    },{
        username: body.username,
        password: body.password
    });

    res.json({
        id: req.params.id,
        message: "Updated successfully"
    })
})

const todoValidation = zod.object({
    title: zod.string().min(1,"title is required"),
    description: zod.string().min(1,"description is required"),
    status: zod.enum(['pending','in-progress','completed']).optional()
})

app.post('/api/v1/todos/todo', middlewares, async (req,res)=>{
    const body = req.body;

    try{
        const { success } = todoValidation.safeParse(body);
        if(!success){
            return res.status(400).json({
                error:"todo validation failed in todo"
            })
        }
        const id = req.userId;
        console.log(id);

        const user = await User.findOne({
            _id:id
        });

        if(!user){
            return res.status(404).json({
                error:"User not found in todos"
            })
        }

        const newTodo = new Todo({
            title: body.title,
            description: body.description,
            status: body.status,
            userId: user._id
        });

        try{
            await newTodo.save();
        }catch(err){
            return res.status(500).json({
                message:"slow database"
            })
        }

        return res.status(201).json({
            message:"Todo is created successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            error: "something went wrong"
        })
    }
});

const todoUpdatedSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
    status: zod.enum(['pending', 'in-progress', 'completed']).optional()
});

app.put('/api/v1/todos/edit/:id', middlewares, async(req,res)=>{
    const { id } = req.params;
    const body = req.body;

    try{
        const { success } = todoUpdatedSchema.safeParse(body);
        if(!success){
            return res.status(400).json({
                message: "updated todo validation failed"
            });
        }

        const todo = await Todo.findOne({_id:id});
        if(!todo){
            return res.status(404).json({
                message: "Todo not found"
            })
        }

        await Todo.updateOne(
            {_id:id},
            {
                title:body.title,
                description: body.description,
                status: body.status
            }
        )
        return res.status(200).json({
            message:"Todo updated successfully"
        });
    }
    catch(err){
        return res.status(500).json({
            message: "Something went wrong while updating the todo"
        })
    }
})

app.delete('/api/v1/todos/delete/:id', middlewares, async(req,res) => {
    const { id } = req.params;
    try{
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if(!deletedTodo){
            return res.status(404).json({
                message: "Todo not found"
            })
        }
        return res.json({
            message: "Todo deleted successfully",
            deletedTodo: deletedTodo
        })
    }
    catch(error){
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
});

app.get('/api/v1/todos/show', middlewares, async(req,res) => {
    const allTodos = await Todo.find({userId: req.userId});
    return res.json({
        allTodos:allTodos
    })
})

app.listen(3000);