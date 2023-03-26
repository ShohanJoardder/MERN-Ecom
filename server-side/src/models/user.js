const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        min: 6,
        max: 64
    },
    address: {
        type: String
    },
    answer: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    }

},{
    timestamps: true,
    versionKey: false
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;