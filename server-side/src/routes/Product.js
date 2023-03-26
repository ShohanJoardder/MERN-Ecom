const express = require("express")
const route = express.Router()

const formidable = require('express-formidable');
const { create, getAllProducts, read, getSingleProduct, photo, remove, update, filteredProducts, productsCount, productSearch, ProductList, relatedProducts, braintreeToken, braintreePayment } = require("../controller/product");
const { registerSignIn, isAdmin } = require("../middleware/auth");


route.post("/create-product", registerSignIn, isAdmin, formidable(), create)
route.get("/get-products", getAllProducts)
route.get("/product/:slug", read)
route.get("/product/photo/:productId", photo)
//get single product
route.get("/get-product/:slug", getSingleProduct)

//product per page
route.get("/product-list/:page", ProductList);

route.delete("/delete-product/:productId", registerSignIn, isAdmin, remove)
route.put("/update-product/:pid", registerSignIn, isAdmin, formidable(), update)
route.post("/filtered-Products", filteredProducts)
route.get("/products-count", productsCount)
route.get("/products/search/:keyword", productSearch)
route.get("/related-products/:productId/:categoryId", relatedProducts)

//Payment Route
//token
route.get("/braintree/token", braintreeToken)

//payment
route.post("/braintree/payment", registerSignIn, braintreePayment)

module.exports = route