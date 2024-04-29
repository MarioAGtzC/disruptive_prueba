const { response } = require('express');

const Theme = require('../models/theme');

const themePost = async(req, res = response) => {
  const { theme, permissions } = req.body;
  const newTheme = new Theme({theme, permissions});
  
  await newTheme.save();

  res.json({
    ok: true,
    msg: 'post API theme from controller'
  });
}

const themeDelete = async(req, res = response) => {
  const { theme } = req.params;

  await Theme.deleteOne({
    theme: { $regex: new RegExp(theme, "i") }
  });

  res.json({
    ok: true,
    msg: `Categoría: ${theme} borrada`
  });
}

module.exports = {
  themePost,
  themeDelete
}