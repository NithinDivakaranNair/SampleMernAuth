import { Link, useNavigate } from "react-router-dom";
import {Form,Button ,Row,Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

import React from 'react'

import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import {toast} from 'react-toastify'

import { useRegisterMutation } from "../slices/usersApiSlice";
// import { setCredentials } from '../slices/authSlice';


const RegisterScreen = () => {

    const[name,setName]=useState('')
     const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')

    const navigate=useNavigate();
    // const dispatch=useDispatch();

const {userInfo}=useSelector((state)=>state.auth)

const [register, { isLoading }] = useRegisterMutation();

useEffect(()=>{
  if(userInfo){
    navigate('/login');
  }
},[navigate,userInfo])


    const submitHandler=async(e)=>{
        e.preventDefault();
if(password!==confirmPassword){
  toast.error("Passwords not match")
}else{
  try{
    const res=await register({name, email,password}).unwrap();
    // dispatch(setCredentials({...res}))
    navigate('/login')
  }catch(err){
    toast.error(err?.data?.message||err.error);

  }
   }
    }


    return (
    <FormContainer>
      <h1>Sign Up</h1>
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
        Sign Up
     </Button>
      
     <Row className="py-3">
        <Col>
       Already have a account?<Link to='/login'>login</Link>
        </Col>
     </Row>

      </Form>
    </FormContainer>
  )
}

export default RegisterScreen
