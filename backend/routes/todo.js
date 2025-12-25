const express = require('express');
const jwt = require('jsonwebtoken');
const z = require('zod');
const middleware = require('../middlewares/user')
const { User, Todo } = require('../db');
const { route } = require('./user');
const router = express.Router();

// post a todo for which you have to login the account
const todoValidation = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    // deadLine: z.string().refine((dateStr) => {
    //     const parsedDate = new Date(dateStr); // Directly parse the YYYY-MM-DD format
    //     return !isNaN(parsedDate.getTime()); // Ensure it's a valid date
    // }, {
    //     message: "Invalid date format. Please use YYYY-MM-DD.",
    // }).refine((dateStr) => {
    //     const parsedDate = new Date(dateStr);
    //     return parsedDate > new Date(); // Validate that it's a future date
    // }, {
    //     message: "Deadline must be a future date",
    // }),
    status: z.enum(['pending', 'in-progress', 'completed']).optional(),
});

router.post('/todo',middleware,async(req,res)=>{
    const body = req.body;
    console.log(body.title,body.description,body.deadLine);
    
   try
   {
        const { success } = todoValidation.safeParse(body);
        if(!success)
        {
            return res.status(400).json({
                error:"todo validation failed in todo"
            })
        }
        const id = req.userId;
        console.log(id);
        
        const user = await User.findOne({
            _id:id
        });

        if(!user)
        {
            return res.status(404).json({
                error:"User not found in todos"
            })
        }
        console.log(body);
        
        const newTodo = new Todo({
            title: body.title,
            description: body.description,
            status: body.status || 'pending',
            createdAt:new Date(),
            deadLine:body.deadLine,
            updatedAt:new Date(),
            userId: user._id, 
        });

       
       try{
        await newTodo.save();
       }
       catch(err)
       {
        return res.status(500).json({
            message:"slow database"
        })
       }      
        

        return res.status(201).json({
            message:"Todo is created successfully"
        })

   }
   catch(err)
   {
    console.error(error);
    return res.status(500).json({ error: 'something went wrong' });
   }
});


const todoUpdatedSchema = z.object({
    title: z.string(),
    description: z.string(),
    deadLine: z.string().refine((dateStr) => {
        const date = new Date(dateStr); // Convert string to Date object
        return !isNaN(date.getTime()); // Ensure it's a valid date
    }, {
        message: "Invalid date format. Please use YYYY-MM-DD.",
    }).refine((dateStr) => {
        const date = new Date(dateStr);
        return date > new Date(); // Validate that the date is in the future
    }, {
        message: "Deadline must be a future date",
    }),
    status: z.enum(['pending', 'in-progress', 'completed']).optional(),
});
router.put('/edit/:id',middleware,async(req,res)=>{
    //update the post
    const {id} = req.params;
    const body = req.body;
    console.log(body);
    

    
    
    try
    {

        const { success } = todoUpdatedSchema.safeParse(body);
        if (!success) 
        {
            return res.status(400).json({
                message: ' updated todo validation failed',
            });
        }
               

        const todo = await Todo.findOne({_id:id});
        if(!todo)
        {
            return res.status(404).json({
                messgae:"Todo not found"
            })
        }
        await Todo.updateOne(
            {_id:id},
            {
                title:body.title,
                description:body.description,
                status:body.status,
                deadLine:body.deadLine,
                updatedAt:new Date()
            }
        )

        return res.status(200).json({
            message: "Todo updated successfully"
        });

    }
    catch(err)
    {
        return res.status(500).json({
            message: "Something went wrong while updating the Todo"
        });
    }
   
})
router.delete('/delete/:id',middleware,async(req,res)=>{
    const { id } = req.params;
    try
    {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if(!deletedTodo)
        {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.json({
            message:"Todo deleted successfully",
            deletedTodo:deletedTodo
        })

    }
    catch (error) {
        console.error("Error deleting todo:", error);
        return res.status(500).json({ message: "Something went wrong" });
      }
})
router.get('/show',middleware,async(req,res)=>{
    const allTodos = await Todo.find({userId:req.userId});
    return res.json({
        allTodos:allTodos
    })
})
module.exports = router;