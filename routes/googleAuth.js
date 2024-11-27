const express = require('express')
const  jwt  = require('jsonwebtoken')
const passport = require('passport')
// const { googleAuth } = require('../controllers/googleAuth')
const router = express.Router()

// router.get('/auth/google',passport.authenticate("google",{scope:["profile","email"]}))


router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure"
    })
})

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully Logged In",
            user: req.user
        })
    } else {
        res.status(403).json({
            error: true,
            message: "Not Authorized"
        })
    }
})

router.get('/google/callback',
    passport.authenticate('google', {failureRedirect: '/login/failed'}),
    (req, res) => {
        const user = req.user
        console.log("user", user)

        if (user) {
            const token = jwt.sign({
                id: user._id,
                email: user.email,
            }, process.env.JWT_SECRET, {
                expiresIn: "8h"
            })

            res.redirect(`${process.env.CLIENT_URL}/login?token=${token}`)
        } else {
            res.redirect(`/login/failed`)
        }
    }
)

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect(process.env.CLIENT_URL)
})

module.exports = router