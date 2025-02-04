import express from 'express';
import searchGame from '../controllers/gamesController.js';

const router = express.Router();

// Define the route for fetching games
router.get('/games', searchGame);

export default router;