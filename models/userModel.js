const { model, Schema } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Set password for user']
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

userSchema.post("save", handleMongooseError);

const User = model('User', userSchema);

module.exports = User;