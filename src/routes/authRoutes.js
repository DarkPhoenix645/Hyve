import { Router } from "express";
import functions from "../scripts/authController";
const router = Router()

router.get('/signup', (req, res) => { functions.signup_get(req, res) })
router.post('/signup', (req, res) => { functions.signup_post(req, res) })
router.get('/login', (req, res) => { functions.login_get(req, res) })
router.get('/logout', (req, res) => { functions.logout_get(req, res) })
router.post('/login', (req, res) => { functions.login_post(req, res) })
router.get('/username', (req, res) => { functions.get_username(req, res) })

module.exports = router