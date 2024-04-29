const { Router } = require('express');
const { check, param, query } = require('express-validator');

const { themePost, themeDelete } = require('../controllers/theme.controller');
const { validateFields } = require('../middlewares');
const { themeExists, isEmpty, isValidPermission, isValidTheme, isValidUser } = require('../helpers/db-validators');

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
  check('id')
    .exists({ values: 'falsy' }).withMessage('El usuario es requerido').bail()
    .isMongoId().withMessage('El id no es correcto').bail()
    .custom(isValidUser),
  validateFields
], themePost);

router.delete('/:themeId', [
  param('themeId')
    .custom(isValidTheme),
  query('id')
    .exists({ values: 'falsy' }).withMessage('El usuario es requerido').bail()
    .isMongoId().withMessage('El id no es correcto').bail()
    .custom(isValidUser),
  validateFields
], themeDelete)

module.exports = router;