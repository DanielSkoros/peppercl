import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    posts: Array,
});

export const UserModel = mongoose.model('User', userSchema)

