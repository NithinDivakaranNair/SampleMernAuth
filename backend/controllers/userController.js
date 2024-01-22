import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"
import User from '../models/userModel.js'


//desc Auth user/set token
//route POST/Api/users/auth
//acess Public

const authUser=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    const user=await User.findOne({email})
    if(user&&(await user.matchPassword(password))){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(401);
        throw new Error('invalid email or password')
    }
    res.status(200).json({message:"Auth User"})
})

//desc registor a new user
//route POST/Api/users
//acess Public

const registorUser=asyncHandler(async(req,res)=>{
    const{name,email,password}=req.body;
    const userExists=await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }
    const user=await User.create({name,email,password});
    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(400);
        throw new Error('invalid ser data')
    }
    res.status(200).json({message:"Registor User"})
})

//desc logout user
//route POST/Api/users/logout
//acess Public

const logoutUser=asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:"Logout User"})
})

//desc GEt user profile
//route POST/Api/users/profile
//acess privte

const getUserProfile=asyncHandler(async(req,res)=>{
    const user={
        _id:req.user._id,
        name:req.user.name,
        email:req.user.email,
    }
    res.status(200).json(user)
})

//desc Update user profile
//route put/Api/users/profile
//acess privte

const updateUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);
    if(user){
        user.name=req.body.name||user.name;
        user.email=req.body.email||user.email;
   if(req.body.password){
    user.password=req.body.password
    }


 const upadatedUser=await user.save();
 res.status(200).json({
    _id:upadatedUser._id,
    name:upadatedUser.name,
    email:upadatedUser.email,

 })
    }else{
        res.status(404);
        throw new Error("User not found")
    }
    res.status(200).json({message:"update user profile"})
})


export {
    authUser,
    registorUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}