const express = require("express")
const route = express.Router()
const {register, login, forgotPassword, secret, profileUpdate, order} = require("../controller/auth")
const { registerSignIn, isAdmin } = require("../middleware/auth")

// User Route
route.post("/register", register)
route.post("/login", login)
route.post("/forgot-password", forgotPassword)

route.get("/auth-check", registerSignIn, (req, res)=>{
    res.json({ok: true})
})
route.get("/admin-check", registerSignIn, isAdmin, (req, res)=>{
    res.json({ok: true})
})
//profile update
route.put("/profile", registerSignIn, profileUpdate)

// Testing
route.get("/secret", registerSignIn, isAdmin, secret)

// auth Route
route.get("/orders", registerSignIn, order)

module.exports = route;