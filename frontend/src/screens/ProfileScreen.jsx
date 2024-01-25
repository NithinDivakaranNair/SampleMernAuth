import { Link, useNavigate } from "react-router-dom";
import {Form,Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'


import React, { useState, useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";
import {toast} from 'react-toastify'

import { setCredentials} from '../slices/authSlice';
import { useUpdateUserMutation } from "../slices/usersApiSlice";

const  ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);


    const[name,setName]=useState('')
     const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')

    const navigate=useNavigate();
    const dispatch=useDispatch();

const {userInfo}=useSelector((state)=>state.auth)

const[updateProfile,{isLoading}]=useUpdateUserMutation();


useEffect(()=>{
  setName(userInfo.name);
  setEmail(userInfo.email)
  setProfileImage(userInfo.profileImage)

},[userInfo.setName,userInfo.setEmail,userInfo.setProfileImage])


const handleImageChange = (e) => {
  const file = e.target.files[0];
  setProfileImage(file);
  setPreviewImage(URL.createObjectURL(file));
};

    const submitHandler=async(e)=>{
        e.preventDefault();
      if(password!==confirmPassword){
       toast.error("Passwords not match")
      }else{
       try{

        const formData = new FormData();
        formData.append('profileImage', profileImage);

    const res=await updateProfile({
        _id:userInfo._id,
        name,
        email,
        password,
       profileImage :formData       
    }).unwrap()

    dispatch(setCredentials({...res}));
    toast.success('profile updated')
   }catch(err){
   toast.error(err?.data?.message||err.error);
     }
      }
        }



  return (
    <FormContainer>
      <h1>Update Profile</h1>

      {previewImage && (
        <img
          src={previewImage}
          alt="Profile Preview"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
      )}


      <Form onSubmit={submitHandler}>

    
      <Form.Group className="my-2" controlId="profileImage">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>

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
{isLoading && <h1>loading..</h1>}

     <Button type="submit" variant="primary" className="mt-3">
     update
     </Button>

      </Form>
    </FormContainer>
  )
}

export default ProfileScreen
