import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { isEmail } from "validator";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "The minimum password length is 6 characters"]
    }
});

UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        } 
        throw Error("The given password is incorrect")
    }
    throw Error("The provided email either doesn't exist or is incorrect")
}

const User = mongoose.model('user', UserSchema);

export default User;