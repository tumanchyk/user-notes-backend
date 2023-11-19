const bcrypt = require('bcrypt');

const { User } = require('../models')

const login = async (req, res) => {
    try {
        const {email, password: pass} = req.body;
        const user = await User.findOne({ email });
        if (!user) {
           return res.status(404).json({message: 'User not found'})
        }

        const isValid = await bcrypt.compare(pass, user.password);
        if (!isValid) {
           return res.status(404).json({message: 'Invalid password or email'})
        }
        const { password, ...userData } = user._doc;
        return res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password: pass, role } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(pass, salt);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hash,
            role
        })
        const { password, ...userData } = user._doc;
        return res.status(201).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

module.exports = {login, register}