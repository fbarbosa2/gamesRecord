import axios from "axios";
import { useState } from "react";

const useSearchGames = () => {
    const [games, setGames] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return; // Prevent empty searches
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get("http://localhost:5000/api/games", {
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