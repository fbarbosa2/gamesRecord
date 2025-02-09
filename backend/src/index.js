import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import CORS
import gamesRoutes from './routes/routes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.json()); // Parse JSON request bodies

// Enable CORS for all frontend requests
app.use(cors({
    origin: ["http://localhost:3000", "gamerecord-5e84e.web.app"], // Allow only frontend (React) LOCALHOST
    methods: ["GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));


// Use the imported routes with /api prefix
app.use('/api', gamesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
