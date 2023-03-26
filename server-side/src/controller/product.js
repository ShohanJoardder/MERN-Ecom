const productModel = require("../models/product")
const slugify = require("slugify")
const fs = require("fs")
const braintree = require("braintree");
const orderModel = require("../models/order");

// Payment GateWay
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

exports.create = async (req, res)=>{
    
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    console.log(products)
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }

}

//=========== Read Product =============//
exports.read = async (req, res)=>{
    try{
        const product = await productModel.findOne({slug: req.params.slug})
                                          .populate("category")
                                          .select("-photo")
        res.json({product})
    }catch(err){
        console.log(err)
    }
}

//=========== Product Photo =============//
exports.photo = async (req, res)=>{
    try{
        const product = await productModel.findById(req.params.productId).select("photo")

        if(product.photo.data){
            res.set("Content-Type", product.photo.contentType)
            return res.send(product.photo.data)
        }
    }catch(err){
        console.log(err)
    }
}

//=========== Delete Product =============//
exports.remove = async (req, res)=>{
    try{
        const product = await productModel.findByIdAndDelete(req.params.productId).select("-photo")
        res.json(product)
    }catch(err){
        console.log(err)
    }
}

//=========== Update Product =============//
exports.update = async (req, res)=>{
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updated product",
    });
  }
}

//================Get Single Product ================//
exports.getSingleProduct = async (req, res)=>{
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
}
//================Get All Product ================//
exports.getAllProducts = async(req,res)=>{
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All Products ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
}
//================== Filtered Product ===================//
exports.filteredProducts = async (req, res)=>{
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
  }

//================Product Count============//  

exports.productsCount =  async (req, res)=>{
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
  }

//================ List Products ============//
exports.ProductList = async (req, res)=>{
  try {
    const perPage = 4;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
}

//=============Search Product ==============//
exports.productSearch = async (req, res)=>{
    try{
        const { keyword } = req.params;

        const result = await productModel.find(
            {
                $or: [
                    {name: {$regex: keyword, $options: "i"}},
                    {description: { $regex: keyword, $options: "i" }}
                ]
            }
        ).select("-photo");

        res.json(result)
    }catch(err){
        console.log(err)
    }
}

//================ Related Products =============//
exports.relatedProducts = async (req, res)=>{
    try{
        const { productId, categoryId} = req.params;

        const related = await productModel.find(
            {
              category: categoryId,
              _id: { $ne: productId }
            }
          ).select("-photo")
           .populate("category")
           .limit(3);
      
           res.status(200).send({
            success: true,
            related,
          });
        
    }catch(err){
        console.log(err)
    }
}

//==========Payment Gateway ==============//

//token
exports.braintreeToken = async (req, res)=>{
  try{
    gateway.clientToken.generate({}, function(err, result){
      if(err){
        res.status(500).send(err)
      }else{
        res.send(result)
      }
    })
  }catch(error){
    console.log(error)
  }
}

//payment
exports.braintreePayment = async (req, res)=>{
  try{
    const {cart, nonce} = req.body;
    let total = 0
    cart.map( (i) => {
      total += i.price
    });

    let newTransaction = gateway.transaction.sale({
      amount: total,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    }, function(err, result){
      if(result){
        const order = new orderModel({
          products: cart,
          payment: result,
          buyer: req.user._id
        }).save()
        res.json(({ok: true}))
      }else{
        res.status(500).send(err)
      }
    })
  }catch (err){
    console.log(err)
  }
}