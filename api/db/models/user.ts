import mongoose from "mongoose";
import { IPost } from "./post";

export interface IUser {
    name: string,
    email: string,
    password: string,
    posts: Array<IPost>
}

export const userSchema = new mongoose.Schema<IUser>({
    name: String,
    email: String,
    password: String,
    posts: Array<IPost>,
});

export const UserModel = mongoose.model<IUser>('User', userSchema)

