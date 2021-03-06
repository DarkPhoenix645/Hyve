const jwt = require('jsonwebtoken');
const { checkUser } = require('./authChecker');
const User = require('./User');
const maxAge = 3 * 24 * 60 * 60;

function errorHandler(err) {
    let errors = { username: "", email: "", password: "" }

    if (err.message === "The provided email either doesn't exist or is incorrect") {
        errors.email = "The provided email either doesn't exist or is incorrect"
        return errors
    }

    if (err.message === "The given password is incorrect") {
        errors.password = "The given password is incorrect"
        return errors
    }

    if (err.code === 11000) {
        err.keyValue.username ? 
            errors.username = "That username has already been registered" :
            errors.email = "That email has already been registered" 
        return errors
    }

    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => { 
            errors[properties.path] = properties.message
        })
    }
    return errors
}

function createToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}

function signup_get (req, res) {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) { res.render('pages/auth', { action: "signup" }) } 
            else { res.redirect('/') }
        })
    } else { res.render('pages/auth', { action: "signup" }) }
}

function login_get (req, res) {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) { res.render('pages/auth', { action: "login" }) } 
            else { res.redirect('/') }
        })
    } else { res.render('pages/auth', { action: "login" }) }
}

async function signup_post (req, res) {
    const { username, email, password, invite } = req.body
    if (req.body.invite === 65535) {
        try {
            const user = await User.create({ username, email, password });
            const token = createToken(user._id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }) 
            res.cookie('name', username, { maxAge: maxAge * 1000 }) 
            res.status(201).json({ user: user._id });
        } catch (err) {
            const errors = errorHandler(err)
            res.status(400).json({ errors : errors })
        }
    } else {
        res.status(400).json({ errors : { username: "", email: "", password: "Invalid invite code" } })
    }

}

function logout_get (req, res) {
    res.cookie('jwt', '', { maxAge: 1 })
    res.cookie('name', '', { maxAge: 1 })
    res.redirect('/')
}

async function login_post (req, res) {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })  
        res.cookie('name', user.username, { maxAge: maxAge * 1000 }) 
        res.status(200).json({ user: user._id })
    } catch (err) {
        const errors = await errorHandler(err)
        res.status(400).json({ errors })
    }
}

function get_username (req, res) {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) { 
                res.cookie('jwt', '', { maxAge: 1 })
                res.cookie('name', '', { maxAge: 1 })
                res.cookie('hasVisited', '', { maxAge: 1 })
                res.redirect('/')
            } 
            else {
                let user = await User.findById(decodedToken.id)
                res.status(200).send(user.username)
            }
        })
    } else { 
        res.status(400)
    }
}

module.exports = { signup_get, signup_post, login_get, login_post, logout_get, get_username }