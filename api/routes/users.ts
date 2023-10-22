var express = require('express');
var router = express.Router();

import MongoModel from '../db/generic';
import { UserModel, userSchema } from '../db/models/user'

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const model = new MongoModel('User', userSchema);
  
  const users = await model.all()
  res.send(users);
});

router.post('/', async function(req, res) {
  const userBody = req.json(req.body);
  const user = new UserModel(userBody)
  await user.save()
  res.send('respond with a resource');
});

router.get('/:id', async (req, res) => {
  const model = new MongoModel('User', userSchema);
  const user = await model.byId(req.params.id);
  res.send(user)
})

module.exports = router;
