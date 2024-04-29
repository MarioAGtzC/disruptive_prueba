const { response, request } = require('express');

const Category = require('../models/category');

const categoryPost = async (req, res = response) => {
  const { category } = req.body;
  const newCategory = new Category({category});
  
  await newCategory.save();

  res.json({
    ok: true,
    msg: 'post API Category from controller'
  });
}

const categoryDelete = async (req = request, res) => {
  const { category } = req.params;

  await Category.deleteOne({
    category: { $regex: new RegExp(category, "i") }
  });

  res.json({
    ok: true,
    msg: `Categoría: ${category} borrada`
  });
}

module.exports = {
  categoryPost,
  categoryDelete
}