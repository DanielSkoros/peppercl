import mongoose from "mongoose";

export interface IUser {
    name: string,
    email: string,
    password: string,
    posts: Array<Object>
}

export const userSchema = new mongoose.Schema<IUser>({
    name: String,
    email: String,
    password: String,
    posts: Array,
});

export const UserModel = mongoose.model<IUser>('User', userSchema)

