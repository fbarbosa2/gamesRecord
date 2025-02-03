import express from 'express';
import searchGame from '../controllers/gamesController.js';
import registerUser from '../controllers/userController.js';

const router = express.Router();

// Define the route for fetching games
router.get('/games', searchGame);
router.post('/register', registerUser);

export default router;