import User from '../models/userModel.js'
import asyncHandler from "express-async-handler"
import generateAdminToken from "../utils/generateAdminToken.js"


//desc Auth admin/set token
//route POST/Api/Admins/auth
//acess Public

const authAdmin=asyncHandler(async(req,res)=>{
    console.log('req.body',req.body);
    const{username,password}=req.body;

    if (username ==="admin" && password === "admin"){
     try{
        const users = await User.find({});
        generateAdminToken(res,username)
        res.status(201).json(users);
     }catch(error){
        console.log(error);

     }
    }else{
        res.status(401);
        throw new Error('invalid email or password')
    }
    res.status(200).json({message:"Auth Admin"})
})


const createUser=asyncHandler(async(req,res)=>{

 try{
    const{name,email,password}=req.body
    const userExists=await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error('User Aready exists.')
    }
    const user=await User.create({name,email,password});
    
    if(user){
        const users = await User.find({});
        res.status(201).json(users);

    }else{
        res.status(400);
        throw new Error("Invalid user data")
    }
 }catch(error){
    console.log(error);
 }
})

const editUser=asyncHandler(async(req,res)=>{
    

try{
    const  id  = req.body.id;

    const user = await User.findById(id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        const updatedUser = await user.save();
        const users = await User.find({});
        return  res.status(201).json(users);

    }else{
        
            res.status(404);
            throw new Error("User not found");
          }
    }catch{
        console.log(error);
    }
}
)


const deleteUser=asyncHandler(async(req,res)=>{
    console.log('delete:',req.params);

try{
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if(user){
        
               const users = await User.find({});
               return res.status(201).json(users);
           
           } else {
             res.status(404);
             throw new Error("User not found.");
           }
    }catch (error) {
        console.log(error);
      }

})

const logoutAdmin=asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:"Logout User"})
})

export{
    authAdmin,
    createUser,
    editUser,
    deleteUser,
    logoutAdmin
}