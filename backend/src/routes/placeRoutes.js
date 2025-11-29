import express from 'express';
import multer from 'multer';
import { getAllPlaces, getPopularPlaces, getPlaceById, createPlace, updatePlace, deletePlace, getPlacesByUser } from '../controllers/placeController.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // Import middleware

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route Public (Bisa diakses siapa saja)
router.get('/', getAllPlaces);
router.get('/popular', getPopularPlaces);
router.get('/:id', getPlaceById);

// Route Protected (Harus Login)
// Route ini khusus untuk mengambil data profile user yg login
router.get('/user/me', verifyToken, getPlacesByUser); 

router.post('/', verifyToken, upload.single('image'), createPlace);
router.put('/:id', verifyToken, upload.single('image'), updatePlace);
router.delete('/:id', verifyToken, deletePlace);

export default router;