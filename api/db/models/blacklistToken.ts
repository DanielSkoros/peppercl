import mongoose from "mongoose";

export interface IToken {
  token: string;
}

export const tokenSchema = new mongoose.Schema<IToken>({
  token: {
    type: String,
    required: true,
  },
});

export const BlacklistTokenModel = mongoose.model<IToken>(
  "BlacklistToken",
  tokenSchema
);
