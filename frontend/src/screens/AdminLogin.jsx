import React from 'react'
import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import {Form,Button ,Row,Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

import { useDispatch,useSelector } from "react-redux";
import { useLoginadminMutation } from '../slices/adminApiSlice';
 import { setCredentials } from '../slices/authAdminSlice';

import {toast} from 'react-toastify'

const AdminLoginScreen = () => {
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')

const navigate=useNavigate();
const dispatch=useDispatch();
const [loginadmin] = useLoginadminMutation();
console.log("loginadmin",loginadmin);

const {adminInfo}=useSelector((state)=>state.authAdmin)
console.log('adminInfo00',{adminInfo});

 useEffect(()=>{
  if(adminInfo){
   navigate('/adminuserdetails');
  }
},[navigate,adminInfo])

    const submitHandler=async(e)=>{
        e.preventDefault();
       try{
        const res=await loginadmin({username,password}).unwrap();
        console.log('res',res);
        dispatch(setCredentials({...res}))
        navigate('/adminuserdetails')
       }catch(err){
    toast.error(err?.data?.message||err.error);
       }
    };

  return (
    <FormContainer>
      <h1>Admin Login</h1>
      <Form onSubmit={submitHandler}>

      <Form.Group className='my-2' controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="text" 
        placeholder="enter email" 
        value={username}
        onChange={(e)=>setUsername(e.target.value)} >
       </Form.Control>
       </Form.Group>

       <Form.Group className='my-2' controlId="password">
       <Form.Label>Password</Form.Label>
        <Form.Control type="password" 
        placeholder="enter password" 
        value={password}
        onChange={(e)=>setPassword(e.target.value)} >
       </Form.Control>
      </Form.Group>
{/* {isLoading && <h2>Loading...</h2>} */}
     <Button type="submit" variant="primary" className="mt-3">
        login In
     </Button>
      
  

      </Form>
    </FormContainer>
  )
}

export default AdminLoginScreen
