import React from 'react'
import Header from './components/Header'
import AdminHeader from './components/AdminHeader'
// import HomeScreen from './screens/HomeScreen'
import { Outlet } from 'react-router-dom'
import {Container} from 'react-bootstrap'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'

const App = () => {

  const { adminInfo } = useSelector((state) => state.authAdmin);

  return (
    <>{adminInfo?(<AdminHeader/>):(<Header/>)}
<ToastContainer/>
{/* <HomeScreen/> */}
<Container className='my-2'>
<Outlet/>
</Container>
    </>
  )
}

export default App
