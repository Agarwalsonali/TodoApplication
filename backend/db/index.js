const mongoose = require('mongoose');

async function connnectDB()
{
    try
    {
        await mongoose.connect('mongodb+srv://prrajpoot12234:HwRz2CJt4WrcWJuK@cluster0.4zk98.mongodb.net/Todo_app');
        console.log("Connected to DBs");
    }
    catch(error)
    {
        console.log("connection failed",error);
    }
}
connnectDB();
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        maxLength: 100,
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deadLine: {
        type: Date,
        default: ()=>{
            const now = Date.now();
            return new Date(now.setDate(now.getDate()+2))
        },
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowerCase: true,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    firstName: {
        type: String,
        trim: true,
        maxLength: 30,
    },
    lastName: {
        type: String,
        trim: true,
        maxLength: 30,
    }
});


const User = mongoose.model("User",userSchema);
const Todo = mongoose.model("Todo",todoSchema);

module.exports={
    User,
    Todo
}