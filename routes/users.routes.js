const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares');
const {
  isValidRole,
  userExists,
  emailExists
} = require('../helpers/db-validators');

const {
  usersPost,
} = require('../controllers/users.controller');

const router = Router();

router.post('/', [
  check('username')
    .exists({ values: 'falsy' }).withMessage('El usuario es requerido').bail()
    .custom(userExists),
  check('email')
    .exists({ values: 'falsy' }).withMessage('El correo es requerido').bail()
    .isEmail().withMessage('No es un correo valido').bail()
    .custom(emailExists),
  check('password')
    .exists({ values: 'falsy' }).withMessage('La contraseña es requerida'),
  check('role')
    .exists({ values: 'falsy' }).withMessage('El rol es requerido').bail()
    .custom(isValidRole),
  validateFields
], usersPost);

module.exports = router;