import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser } from "../db/models/user";

var express = require("express");
var router = express.Router();

const { UserModel } = require("../db/models/user.ts");
/* GET users listing. */
router.get(
  "/",
  async function (req: any, res: { send: (arg0: any) => void }, next: any) {
    const users = await UserModel.find({});
    res.send(users);
  }
);

router.get(
  "/:id",
  async (
    req: { params: { id: string } },
    res: { send: (arg0: IUser) => void }
  ) => {
    const user = await UserModel.find({ id: req.params.id });
    res.send(user);
  }
);

router.post(
  "/login",
  async function (
    req: { json: (arg0: any) => any; body: any; cookies: any },
    res: {
      send: (arg0: any) => void;
      status: (arg0: number) => any;
      cookie: (arg0: string, arg1: string) => any;
    }
  ) {
    const sendError = (message: string = "Email or password is incorrect") => {
      res.status(400).json({
        error: "Validation error",
        message,
      });
    };
    const userBody = req.body;

    const user = await UserModel.findOne({ email: userBody.email });
    if (!user) return sendError();

    const passwordsMatch = await bcrypt.compare(
      userBody?.password,
      user.password
    );
    if (!passwordsMatch) return sendError();
    
    const token = jwt.sign(
      {
        data: userBody.email,
      },
      "secret",
      { expiresIn: "24h" }
    );
    res.cookie("auth", token.toString()).send({token});
  }
);

router.post(
  "/register",
  async function (
    req: { json: (arg0: any) => any; body: any },
    res: { send: (arg0: any) => void; status: (arg0: number) => any }
  ) {
    const userBody = req.body;
    try {
      const user = new UserModel(userBody);
      const userRes = await user.save();
      res.send(userRes);
    } catch (err: any) {
      res.status(400).json({
        error: "Validation error",
        message: err,
      });
    }
  }
);

module.exports = router;
