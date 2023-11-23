const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

require("dotenv").config()
const { SECRET_KEY } = process.env;

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
        const payload = {
            id: user._id,
        }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
        await User.findByIdAndUpdate(user._id, { token })
        
        const { password, ...userData } = user._doc;
        return res.status(200).json({...userData, token});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

const register = async (req, res) => {
    try {
        const { name, email, password: pass, role } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(pass, salt);
        const user = await User.findOne({ email });
    
        if (user) {
            return res.status(409).json({error: "Email already in use"})
        }
        const newUser = await User.create({
            name,
            email,
            password: hash,
            role
        })

        const { password, ...userData } = newUser._doc;
        return res.status(201).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" })
    res.status(204).json({ message: "Logout success" })
}  


module.exports = {login, register, logout}