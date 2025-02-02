import axios from 'axios';

const API_KEY = 'c91e07b6fecf411586c31fbc5324b81d';
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
        res.status(500).json({ error: error.response?.data || error.message });
    }
};

export default searchGame;