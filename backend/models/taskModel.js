const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content:{
            type: String,
            required: true,
        },
        createdDate:{
            type: Date,
            required: false,
            default: new Date()
        },
        status:{
            type: String,
            required: false,
            default: "ToDo"
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref:"User",
        }
        
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;