import axios from "axios";
import { useState } from "react";

const useSearchGames = () => {
    const [games, setGames] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_BASE_URL = "https://gamesrecord.onrender.com";

    const handleSearch = async () => {
        if (!searchQuery.trim()) return; // Prevent empty searches
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${API_BASE_URL}/api/games`, {
                params: { search: searchQuery },
            });

            setGames(response.data);
        } catch (err) {
            setError("Failed to fetch games");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { games, searchQuery, setSearchQuery, handleSearch, loading, error };
};

export default useSearchGames;