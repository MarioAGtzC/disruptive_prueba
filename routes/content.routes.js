const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares');
const { contentPost } = require('../controllers/content.controller');
const { isValidUser, isValidCategory, isValidTheme } = require('../helpers/db-validators');

const router = Router();

router.post('/', [
  check('category')
    .exists({ values: 'falsy' }).withMessage('La categoría es requerida').bail()
    .isMongoId().withMessage('El id no es correcto').bail()
    .custom(isValidCategory),
  check('theme')
    .exists({ values: 'falsy' }).withMessage('La temática es requerida').bail()
    .isMongoId().withMessage('El id no es correcto').bail()
    .custom(isValidTheme),
  check('uploadBy')
    .exists({ values: 'falsy' }).withMessage('El usuario es requerido').bail()
    .isMongoId().withMessage('El id no es correcto').bail()
    .custom(isValidUser),
  validateFields
], contentPost);

module.exports = router;