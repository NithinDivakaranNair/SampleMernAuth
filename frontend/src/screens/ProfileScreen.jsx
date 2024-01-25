import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { setCredentials } from "../slices/authSlice";
import {
  useUpdateUserMutation,
  useUploadMutation,
} from "../slices/usersApiSlice";

const ProfileScreen = () => {
  const [image, setImage] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();
  const [upload] = useUploadMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.setName, userInfo.setEmail]);

  console.log("This is the userINDOR",userInfo)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    // setImage(URL.createObjectURL(file));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords not match");
    } else {
      try {
        let imageUrl;
        console.log('This is the Imgga',image);
        if (image) {
          console.log("iiimage", image);
          // Create a new FormData instance
          const formData = new FormData();
          formData.append("avatar", image);
          console.log("formData", formData);
          // Send the image to th  e server
           const imageResponse = await fetch(
            "http://localhost:5000/api/users/upload",
            {
              method: "POST",
              body: formData,
            }
          );
          // const imageResponse = await upload(formData).unwrap();
          if (!imageResponse.ok) {
            toast.error("Error uploading image");
            return;
          }

          // Get the URL of the uploaded image
          imageUrl = await imageResponse.text();
          console.log("imageUrl", imageUrl);
          // Append the image URL to the form data
          formData.append("imageUrl", imageUrl);
        }
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          imageUrl,
        }).unwrap();

        dispatch(setCredentials({ ...res }));
        toast.success("profile updated");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Update Profile</h1>

      {userInfo.image ? (
        <img
          src={`http://localhost:5000/${userInfo.image}`}
          alt="Profile Preview"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      ) : (
        <img
          src="https://w7.pngwing.com/pngs/695/655/png-transparent-head-the-dummy-avatar-man-tie-jacket-user.png"
          alt="Default Profile"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
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

        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {isLoading && <h1>loading..</h1>}

        <Button type="submit" variant="primary" className="mt-3">
          update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
