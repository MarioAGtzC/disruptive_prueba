const { Router } = require('express');
const { check, query, param } = require('express-validator');

const { validateFields } = require('../middlewares');
const { categoryExists, isValidCategory, isValidUser } = require('../helpers/db-validators');
const { categoryPost, categoryDelete } = require('../controllers/category.controller');

const router = Router();

router.post('/', [
  check('category')
    .exists({ values: 'falsy' }).withMessage('La categoría es requerido').bail()
    .custom(categoryExists),
  check('id')
    .exists({ values: 'falsy' }).withMessage('El usuario es requerido').bail()
    .isMongoId().withMessage('El id no es correcto').bail()
    .custom(isValidUser),
  validateFields
], categoryPost);

router.delete('/:categoryId', [
  param('categoryId')
    .custom(isValidCategory),
  query('user')
    .exists({ values: 'falsy' }).withMessage('El usuario es requerido').bail()
    .isMongoId().withMessage('El id no es correcto').bail()
    .custom(isValidUser),
  validateFields
], categoryDelete)

module.exports = router;