import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import CORS
import gamesRoutes from './routes/routes.js'; // Import the router

const app = express();

app.use(bodyParser.json()); // Parse JSON request bodies

// Enable CORS for all frontend requests
app.use(cors({
    origin: "http://localhost:3000", // Allow only your frontend (React)
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// Use the imported routes with /api prefix
app.use('/api', gamesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
