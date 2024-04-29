const { response, request } = require('express');

const Category = require('../models/category');

const categoryPost = async (req, res = response) => {
  const { category } = req.body;
  const newCategory = new Category({category});
  
  await newCategory.save();

  res.json({
    ok: true,
    msg: `Categoría: ${category} creada`
  });
}

const categoryDelete = async (req = request, res) => {
  const { categoryId } = req.params;

  const category = await Category.findByIdAndDelete(categoryId);

  res.json({
    ok: true,
    msg: `Categoría: ${category.category} borrada`
  });
}

module.exports = {
  categoryPost,
  categoryDelete
}