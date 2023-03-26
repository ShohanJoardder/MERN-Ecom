const express = require("express")
const route = express.Router()

const { create, update, remove, list, read, productsByCategory } = require("../controller/category")
const { registerSignIn, isAdmin } = require("../middleware/auth")

route.post("/category", registerSignIn, isAdmin, create)
route.put("/category/:id", registerSignIn, isAdmin, update)
route.delete("/delete-category/:id", registerSignIn, isAdmin, remove)

route.get("/categories", list)
route.get("/category/:slug", read)
route.get("/product-by-category/:slug", productsByCategory)

module.exports = route