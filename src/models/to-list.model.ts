import mongoose from "mongoose";

const toList = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true

    }
},
    {
        timestamps: true
    });


export const todoListModel = mongoose.model('todolist', toList)