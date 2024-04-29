const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares');
const { isValidLog } = require('../helpers/db-validators');

const router = Router();

router.post('/', [
  check('log')
    .exists({ values: 'falsy' }).withMessage('El usuario o correo es requerido').bail()
    .custom(isValidLog),
  check('password')
    .exists({ values: 'falsy' }).withMessage('La contraseña es requerida').bail(),
  validateFields
], login);

module.exports = router;