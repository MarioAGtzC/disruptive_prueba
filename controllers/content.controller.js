const path = require('path');
const { response, request } = require('express');

const Content = require('../models/content');

const contentPost = async (req = request, res = response) => {
  if(!req.files || !req.files.file ||  Object.keys(req.files).length === 0) {
    return res.status(400).json({msg: 'No se subieron archivos'});
  }

  const { file } = req.files;

  const url = path.join(__dirname, '../uploads/', file.name);

  file.mv(url, err => {
    if(err) {
      return res.status(500).send({err});
    }
  });

  const { title, category, theme, uploadBy } = req.body;

  const content = await Content({ title, category, theme, uploadBy, url });

  await content.save();

  res.send({
    ok: true,
    msg: 'Archivo subido'
  });
}

module.exports = {
  contentPost
}