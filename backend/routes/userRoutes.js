import express from 'express';
import {
  authUser,
  registorUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./backend/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// const storage = multer.diskStorage({
   
//   destination: (req, file, cb) => {
    
//     cb(null, "./uploads");
    
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },   
// });

// const upload = multer({ storage: storage });




const router = express.Router();
console.log("userorut");
router.post('/', registorUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post("/upload", upload.single("avatar"), (req, res) => {
  res.send(req.file.path.substring(16));
});
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect,  updateUserProfile);

export default router;
