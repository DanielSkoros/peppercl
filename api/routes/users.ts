import { IUser } from "../db/models/user";

var express = require('express');
var router = express.Router();

const { UserModel, userSchema } = require('../db/models/user.ts')
/* GET users listing. */
router.get('/', async function(req: any, res: { send: (arg0: any) => void; }, next: any) {
  const users = await UserModel.all()
  res.send(users);
});

router.get('/:id', async (req: { params: { id: string; }; }, res: { send: (arg0: IUser) => void; }) => {
  const user = await UserModel.byId(req.params.id);
  res.send(user)
})

router.post('/register', async function(req: { json: (arg0: any) => any; body: any; }, res: { send: (arg0: string) => void; }) {
  const userBody = req.body;



  const user = new UserModel(userBody)
  await user.save()
  res.send('respond with a resource');
})

module.exports = router;
