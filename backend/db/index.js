const mongoose = require("mongoose");
const { string, lowercase, minLength } = require("zod");
const { required } = require("zod/mini");

try{
    mongoose.connect("mongodb://localhost:27017/todoApp")
}catch(e){
    res.json({
        message: "can't connect to database"
    })
}

const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
    },
    description:{
        type:String,
        trim:true
    },
    status:{
        type: String,
        enum: ['pending','in-progress','completed'],
        default: 'pending'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

const User = mongoose.model('User',userSchema)
const Todo = mongoose.model('Todo',todoSchema)

module.exports = {
    User,
    Todo
}