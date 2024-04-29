const { Router } = require('express');
const { check, param, query } = require('express-validator');

const { themePost, themeDelete } = require('../controllers/theme.controller');
const { validateFields } = require('../middlewares');
const { themeExists, isEmpty, isValidPermission, isValidTheme } = require('../helpers/db-validators');

const router = Router();

router.post('/', [
  check('theme')
    .exists({ values: 'falsy' }).withMessage('La temática es requerido').bail()
    .custom(themeExists),
  check('permissions')
    .exists({ values: 'falsy' }).withMessage('Los permisos son requeridos').bail()
    .isArray().withMessage('Los permisos deben ser un array').bail()
    .custom(isEmpty).bail()
    .custom(isValidPermission),
  check('role')
    .exists({ values: 'falsy' }).withMessage('El rol es requerido').bail()
    .equals('ADMIN_ROLE').withMessage('Este rol no puede crear temáticas'),
  validateFields
], themePost);

router.delete('/:theme', [
  param('theme')
    .custom(isValidTheme),
  query('role')
    .equals('ADMIN_ROLE').withMessage('Este rol no puede eliminar categorías'),
  validateFields
], themeDelete)

module.exports = router;