const Router = require('express');
const controller = require('../controllers/auth-controller');
const { check } = require("express-validator");

const router = new Router()

router.post('/registration', [
    check('username', "Введите ваше имя").notEmpty(),
    check('email', "Введите корретный e-mail").isEmail(),
    check('password', "Пароль должен быть не менее 6 символов").isLength({min:6})
], controller.registration);

router.post('/login', [
    check('email', "Введите корретный e-mail").normalizeEmail().isEmail(),
    check('password', "Пароль должен быть не менее 6 символов").isLength({min:6})
], controller.login)

module.exports = router