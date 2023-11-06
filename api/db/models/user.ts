import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { IPost } from "./post";

export interface IUser {
  name: string;
  email: string;
  password: string;
  posts: Array<IPost>;
}

export const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v.toLowerCase()
        );
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  posts: Array<IPost>,
});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (error: any) {
      return next(error);
    }
  });

export const UserModel = mongoose.model<IUser>("User", userSchema);
