const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config();

class authController {
    async registration(req, res) {
        try {
            const { username, email, password } = req.body;
            if (!username) { 
                return res.status(400).json({ message: 'Введите имя' })
            }              
            if (!email) { 
                return res.status(400).json({ message: 'E-mail не гайден' })
            }              
            if (!password) { 
                return res.status(400).json({ message: 'Пароль не найден' })
            }              
            if (password) { 
                if (password.length < 6) { 
                    return res.status(400).json({ message: 'Пароль должен быть не менее 6 символов' })
                }
            }              
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Ошибка регистрации', errors })
            }                 
            const candidate = await User.findOne({ email })
            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таким e-mail уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({ username, email, password: hashPassword })
            await user.save();
            return res.status(200).json({ message: 'Пользователь зарегистрирован', status: 200 })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Ошибка регистрации' })
        }
    }
    
    async login(req, res) { 
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Ошибка входа', errors })
            }               
            const { username, email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) { 
                return res.status(400).json({ message: 'E-mail не найден' })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) { 
                return res.status(400).json({ message: 'Некорректный пароль' })
            }
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWTSecret,
                { expiresIn: '24h' }
            )            
            const userEmail = user.email
            const userId = user._id
            const userName = user.username
            return res.status(200).json({ token, userEmail, userId, userName, status: 200  })
        } catch (e) { 
            console.log(e)
            res.status(400).json({ message: 'Ошибка входа' })
        }
    }
}

module.exports = new authController()