import mongoose from "mongoose";
import { IPost } from "./post";

export interface IUser {
    name: string,
    email: string,
    password: string,
    posts: Array<IPost>
}

export const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts: Array<IPost>,
});

export const UserModel = mongoose.model<IUser>('User', userSchema)