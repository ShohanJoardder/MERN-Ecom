const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    products: [
        {
          type: mongoose.ObjectId,
          ref: "products",
        },
      ],
      payment: {},
      buyer: {
        type: mongoose.ObjectId,
        ref: "users",
      },
      status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "delivered", "cancel"],
      }
},{
    timestamps: true,
    versionKey: false
});

const orderModel = mongoose.model("Order" ,orderSchema)
module.exports = orderModel;