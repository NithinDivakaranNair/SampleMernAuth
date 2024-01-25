import { Link, useNavigate } from "react-router-dom";
import {Form,Button ,Row,Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

import React from 'react'

import { useState } from "react";
import { useDispatch } from "react-redux";
import {toast} from 'react-toastify'

import { useCreateUserMutation } from "../slices/adminApiSlice";
import { setCredentials } from '../slices/authAdminSlice';


const RegisterScreen = () => {

    const[name,setName]=useState('')
     const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')

    const navigate=useNavigate();
    const dispatch=useDispatch();


    const [register, { isLoading }] = useCreateUserMutation();


     const submitHandler=async(e)=>{
        e.preventDefault();
     if(password!==confirmPassword){
      toast.error("Passwords not match")
       }else{
       try{
     const res=await register({name, email,password}).unwrap();
    dispatch(setCredentials({...res}))
    navigate('/usertable')
       }catch(err){
    toast.error(err?.data?.message||err.error);

       }
        }
         }


    return (
    <FormContainer>
      <h1>Create User</h1>
      <Form onSubmit={submitHandler}>

      <Form.Group className='my-2' controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" 
        placeholder="enter name" 
        value={name}
        onChange={(e)=>setName(e.target.value)} >
       </Form.Control>
       </Form.Group>

      <Form.Group className='my-2' controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" 
        placeholder="enter email" 
        value={email}
        onChange={(e)=>setEmail(e.target.value)} >
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

      <Form.Group className='my-2' controlId="confirmPassword">
       <Form.Label>Password</Form.Label>
        <Form.Control type="password" 
        placeholder="enter confirmPassword" 
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)} >
       </Form.Control>
      </Form.Group>

     {isLoading&& <h1>loading...</h1>}

     <Button type="submit" variant="primary" className="mt-3">
        Add User
     </Button>
      
    </Form>
    </FormContainer>
  )
}

export default RegisterScreen
