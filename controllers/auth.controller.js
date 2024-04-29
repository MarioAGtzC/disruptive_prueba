const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const login = async(req, res = response) => {
  const { log, password } = req.body;
  const user = await User.findOne({
    $or: [
      { username: { $regex: new RegExp(log, "i") } },
      { email: { $regex: new RegExp(log, "i") } }
    ]
  });
  
  const validPassword = bcryptjs.compareSync(password, user.password);

  if(!validPassword) {
    return res.status(400).json({
      msg: 'Usuario / Password no son correctos - password'
    });
  }

  res.json({
    ok: true,
    msg: 'post API login from controller',
    role: user.role
  });
}

module.exports = {
  login,
}