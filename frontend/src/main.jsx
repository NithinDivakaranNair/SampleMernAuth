import React from 'react'
import ReactDOM from 'react-dom/client';

import {createBrowserRouter,
  createRoutesFromElements,
  Route,RouterProvider
} from 'react-router-dom'

import store from './store.js'
import { Provider } from 'react-redux'; 

import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';

import PrivateRoute from './screens/PrivateRoute.jsx';

import AdminLoginScreen from './screens/AdminLogin.jsx';
import AdminUserDetails from './screens/AdminUserDetails.jsx';
import Usertable from './components/Usertable.jsx';
import AddUser from './components/AddUser.jsx';

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
   <Route index={true} path='/' element={<HomeScreen/>}/>
   <Route  path='/login' element={<LoginScreen/>}/>
   <Route  path='/register' element={<RegisterScreen/>}/>

   {/* User Private Routes*/}
   <Route path='' element={<PrivateRoute/>}>
   <Route  path='/profile' element={<ProfileScreen/>}/>
   </Route>

{/* Admin Private Routes*/}
 
 <Route path='/adminlogin' element={<AdminLoginScreen/>}/>
 <Route path='/adminuserdetails' element={<AdminUserDetails/>}/>
 <Route path='/usertable' element={<Usertable/>}/>
 <Route path='/createuser' element={<AddUser/>}/>
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </React.StrictMode>
  </Provider>
)
