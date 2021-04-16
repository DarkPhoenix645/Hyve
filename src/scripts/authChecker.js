import jwt from "jsonwebtoken";
import User from "./User";

function requireAuth(req, res, next) {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) { res.redirect('/login') } 
            else { next() }
        })
    } else { res.redirect('/login') }
};

function checkUser(req, res, next) {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) { 
                res.locals.user = null
                next() 
            } 
            else {
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next() 
            }
        })
    } else { 
        res.locals.user = null
        next()
     }
}

module.exports = { requireAuth, checkUser };