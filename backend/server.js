import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
const port=process.env.PORT ||5000;
import userRoutes from './routes/userRoutes.js'
import mongoose from "mongoose";
const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use('/api/users',userRoutes)

app.get('/',(req,res)=>res.send('server is ready'))

app.use(notFound);
app.use(errorHandler)
mongoose.connect('mongodb://127.0.0.1:27017/employee')

app.listen(port,()=>console.log(`Server stated on port ${port}`))

//-**POST /api/users**-Register a user
//-**POST /api/users/auth**-Authenticate a user and get token
//-**POST /api/users/logout**-logout user and clear cookie
//-**GET /api/users/profile**-Get user profile
//-**PUT /api/users/profile**-Update profile
