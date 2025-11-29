import express from 'express';
import { toggleFavorite, getUserFavorites, checkFavoriteStatus } from '../controllers/favoriteController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Semua route favorit butuh login (verifyToken)
router.post('/', verifyToken, toggleFavorite);
router.get('/', verifyToken, getUserFavorites);
router.get('/check/:placeId', verifyToken, checkFavoriteStatus);

export default router;