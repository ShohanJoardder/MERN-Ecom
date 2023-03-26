const userModel = require("../models/user")
const orderModel = require("../models/order")
const {hashPassword, comparePassword} = require("../helper/auth.js")
const jwt = require("jsonwebtoken")

//------Registration----------//
exports.register = async (req, res)=>{
    try{
        // Destructure name email password form req.body
        const {name, email, password, answer, address} = req.body;

        //validations
        if(!name){
            return res.json({error: "Name is Required"})
        }
        if(!email){
            return res.json({error: "Email is Required"})
        }
        if(!answer){
            return res.json({error: "Answer is Required"})
        }
        if(!address){
            return res.json({error: "Address is Required"})
        }
        if(!password || password.length < 6){
            return res.json({error: "Password muse be at least 6 character long"})
        }

        // check if email is taken
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.json({error: "Email is taken"})
        }

        // hash password
        const HashPassword = await hashPassword(password)

         // register user
         const user = await new userModel({
            name,
            email,
            password: HashPassword,
            answer,
            address
         }).save()

         // create signed jwt
        const token = jwt.sign({_id: user._id}, process.env.jWT_SECRET, { expiresIn: '7d' });

        // send responsive
        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
                answer: user.answer
            },
            token
        })
    }catch(err){
        console.log(err)
    }
}


// ========== Author Login ===================//
exports.login = async (req, res)=>{
    try{
        // Destructure email password form req.body
        const {email, password} = req.body;

        //validations
        if(!email){
            return res.json({error: "Please!! submit your email"})
        }
        if(!password || password.length <6){
            return res.json({error: "password must be at least 6 characters long"})
        }

        // check if email is taken
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({error: "user not found"})
        }

        // compare password
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.json({error: "password is wrong"})
        }

        // create signed jwt
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})

        // 7. send response
        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address
            },
            token
        })
    }catch(err){
        console.log(err)
    }
}

//============== Forgot Password ==========//
exports.forgotPassword = async (req, res)=>{
    try{
        const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!answer) {
      return res.status(400).json({ message: "answer is required" });
    }
    if (!newPassword) {
      return res.status(400).json({ message: "newPassword is required" });
    }

    //check
    const user = await userModel.findOne({ email, answer});

    //validation
    if (!user) {
        return res.status(404).send({
          status: false,
          message: "Wrong Email Or Answer",
        });
    }

    const Hashed = await hashPassword(newPassword)
    const Result = await userModel.findByIdAndUpdate(user._id, {password: Hashed})
    if(Result){
       return res.status(200).json({message: "password reset successful"})
    }
    }catch(err){
        console.log(err)
        return res.status(400).json(err.message)
    }
}

// ================== Secret ===================//
exports.secret = async (req, res)=>{
    res.json({currentUser: req.user})
}


// ================== Profile Update ===================//
exports.profileUpdate = async (req, res)=>{
    try {
        const { name, email, password, address} = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
          return res.json({ error: "Password is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
          req.user._id,
          {
            name: name || user.name,
            password: hashedPassword || user.password,
            address: address || user.address,
          },
          { new: true }
        );
        res.status(200).send({
          success: true,
          message: "Profile Updated SUccessfully",
          updatedUser,
        });
      } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error While Update profile",
          error,
        });
      }
}

// Orders
exports.order = async (req, res)=>{
    try{
        const orders = await orderModel.find({buyer: req.user_id,})
                                       .populate("products", "-photo")
                                       .populate("buyer", "name")
        res.json(orders)
    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error While Getting order",
            err,
          });
    }
}