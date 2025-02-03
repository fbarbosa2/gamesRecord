import axios from 'axios';

const API_KEY = process.env.RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api/games';

const searchGame = async (req, res) => {
    const { search } = req.query; // Get search query from request parameters

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                search: search || '',
                page_size: 5, // Number of results per page
            }
        });

        res.json(response.data.results); // Send results to the client
    } catch (error) {
        console.error("Error fetching games:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch games. Please try again later." });
    }
};

export default searchGame;