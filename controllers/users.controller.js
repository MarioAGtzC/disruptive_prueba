const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersPost = async (req = request, res) => {
  const { username, email, password, role } = req.body;
  const user = new User({username, email, password, role});

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();
  
  res.json({
    ok: true,
    msg: 'post API from controller',
    user,
    password: password
  });
}

module.exports = {
  usersPost,
}