const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        default: "dgt_investor"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    walletAddress: {
        type: String,
        required: true,
        unique: true
    },
    profile: {
        name: {
            type: String,
            trim: true
        },
        bio: {
            type: String,
            trim: true
        },
        avatarUrl: {
            type: String,
            trim: true
        }
    },
    followers:[
        {
            name: {
                type: String,
                trim: true
            },
            avatarUrl: {
                type: String,
                trim: true
            },
            profile_id:{
                type: String,
                trim: true
            }
        }
    ],
    socialLinks: {
        twitter: {
            type: String,
            trim: true
        }               
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
