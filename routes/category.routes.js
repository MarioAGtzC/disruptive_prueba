const { Router } = require('express');
const { check, query, param } = require('express-validator');

const { validateFields } = require('../middlewares');
const { categoryExists, isValidCategory} = require('../helpers/db-validators');
const { categoryPost, categoryDelete } = require('../controllers/category.controller');

const router = Router();

router.post('/', [
  check('category')
    .exists({ values: 'falsy' }).withMessage('La categoría es requerido').bail()
    .custom(categoryExists),
  check('role')
    .exists({ values: 'falsy' }).withMessage('El rol es requerido').bail()
    .equals('ADMIN_ROLE').withMessage('Este rol no puede crear temáticas'),
  validateFields
], categoryPost);

router.delete('/:category', [
  param('category')
    .custom(isValidCategory),
  query('role')
    .equals('ADMIN_ROLE').withMessage('Este rol no puede eliminar categorías'),
  validateFields
], categoryDelete)

module.exports = router;