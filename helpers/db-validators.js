const Category = require('../models/category');
const Role = require('../models/role');
const Theme = require('../models/theme');
const User = require('../models/user');

const isValidRole = async (role = '') => {
  const roleExists = await Role.findOne({role});
  if(!roleExists) {
    throw new Error(`El rol: ${role} no es valido`)
  }
}

const userExists = async(username = '') => {
  const userExists = await User.findOne({
    username: { $regex: new RegExp(username, "i") }
  });
  
  if(userExists) {
    throw new Error(`El usuario: ${username} ya existe`)
  }
}

const emailExists = async(email = '') => {
  const emailExists = await User.findOne({
    email: { $regex: new RegExp(email, "i") }
  });

  if(emailExists) {
    throw new Error(`El correo: ${email} ya existe`)
  }
}

const isValidLog = async (log = '') => {
  const user = await User.findOne({
    $or: [
      { username: { $regex: new RegExp(log, "i") } },
      { email: { $regex: new RegExp(log, "i") } }
    ]
  });

  if(!user) {
    throw new Error(`El correo: ${email} es incorrecto`)
  }
}

const categoryExists = async(category = '') => {
  const categoryExists = await Category.findOne({
    category: { $regex: new RegExp(category, "i") }
  });

  if(categoryExists) {
    throw new Error(`La categoría: ${category} ya existe`)
  }
}

const isValidCategory = async (category = '') => {
  const categoryValid = await Category.findOne({
    category: { $regex: new RegExp(category, "i") }
  });

  if(!categoryValid) {
    throw new Error(`La categoría: ${category} es incorrecta`)
  }
}

const themeExists = async(theme = '') => {
  const themeExists = await Theme.findOne({
    theme: { $regex: new RegExp(theme, "i") }
  });

  if(themeExists) {
    throw new Error(`La temática: ${theme} ya existe`)
  }
}

const isEmpty = async (array = []) => {
  if(array.length === 0) {
    throw new Error('Los permisos no pueden estar vacio')
  }
}

const isValidPermission = async (array = []) => {
  array.forEach(async (permission) => {
    const category = await Category.findOne({
      category: { $regex: new RegExp(permission, "i") }
    });

    if(!category) {
      console.log(`Los permisos: ${permission} son incorrectos`);
      // throw new Error('Los permisos no pueden estar vacio')
    }
  });
}

const isValidTheme = async (theme = '') => {
  const themeValid = await Theme.findOne({
    theme: { $regex: new RegExp(theme, "i") }
  });

  if(!themeValid) {
    throw new Error(`La temática: ${category} es incorrecta`)
  }
}

module.exports = {
  isValidRole,
  userExists,
  emailExists,
  isValidLog,
  categoryExists,
  isValidCategory,
  themeExists,
  isEmpty,
  isValidPermission,
  isValidTheme,
}