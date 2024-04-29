const { response } = require('express');

const Theme = require('../models/theme');

const themePost = async(req, res = response) => {
  const { theme, permissions } = req.body;
  const newTheme = new Theme({theme, permissions});
  
  await newTheme.save();

  res.json({
    ok: true,
    msg: `Temática: ${theme} creada`
  });
}

const themeDelete = async(req, res = response) => {
  const { themeId } = req.params;

  const theme = await Theme.findByIdAndDelete(themeId);

  res.json({
    ok: true,
    msg: `Temática: ${theme.theme} borrada`
  });
}

module.exports = {
  themePost,
  themeDelete
}