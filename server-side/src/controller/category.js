const categoryModel = require("../models/category");
const productModel = require("../models/product")
const slugify = require("slugify")

//======== Category Create ============//
exports.create = async (req, res)=>{

    try {
        const { name } = req.body;
        if (!name) {
          return res.status(401).send({ message: "Name is required" });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
          return res.status(200).send({
            success: false,
            message: "Category Already Exists",
          });
        }
        const category = await new categoryModel({
          name,
          slug: slugify(name),
        }).save();
        res.status(201).send({
          success: true,
          message: "new category created",
          category,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in Category",
        });
      }
}

//============= Update Category ============//

exports.update = async (req, res) => {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const category = await categoryModel.findByIdAndUpdate(
        id,
        { name, slug: slugify(name) },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Category Updated Successfully",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while updating category",
      });
    }
  };

//============== Delete Category ==================//
exports.remove = async (req, res) => {
    try {
      const { id } = req.params;
      await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Category Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting category",
        error,
      });
    }
  };

//============= List Category ==============//
exports.list = async (req, res) => {
    try {
      const category = await categoryModel.find({});
      res.status(200).send({
        success: true,
        message: "All Categories List",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all categories",
      });
    }
  };

//=========== Read Category ==============//
exports.read = async (req, res)=>{
    try{
        const Category = await categoryModel.findOne({slug: req.params.slug})
        res.json(Category)
    }catch(err){
        console.log(err)
        return res.status(400).json(err.message)
    }
}

//================== Product By Category ===============//
exports.productsByCategory = async(req, res)=>{
    try{
        const category = await categoryModel.findOne({slug: req.params.slug})
        const products = await productModel.find({category}).populate("category")

        res.status(200).send({
          success: true,
          category,
          products,
        });
    }catch(err){
        console.log(err)
    }
}