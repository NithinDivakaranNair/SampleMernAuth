import express from 'express';
import{
    authAdmin,
    createUser,
    editUser,
    deleteUser,
    logoutAdmin
}from '../controllers/adminControlle.js';

import { adminProtect } from '../middleware/authAdminMiddleware.js';


const router = express.Router();


router.post('/login',authAdmin);
router.post('/adduser',createUser)

// router
//  .route('/user')
//  .put(adminProtect,editUser)
//  .delete(adminProtect,deleteUser)
 router.put('/user',adminProtect,editUser)
 router.delete('/user/:id',adminProtect,deleteUser)

router.post('/logoutAdmin', logoutAdmin);


 export default router;

 