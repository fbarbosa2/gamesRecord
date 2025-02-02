import React, { useState } from "react";
import axios from "axios";

const Search = () => {
    const [games, setGames] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch games when the button is clicked
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

    return (
        <div className="search-page">
            <h1>Search</h1>
            <div className="search-bar">
                <input 
                    id="search-input"
                    type="text"
                    placeholder="Search for games"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button id="search-button" onClick={handleSearch}>Search</button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div id="search-results">
                {games.map((game) => (
                    <div key={game.id} className="search-result">
                        <img src={game.background_image} alt={game.name} />
                        <h2>{game.name}</h2>
                        <p>{game.description || "No description available."}</p>
                        <button className="add-game-button" onClick={""}>+ Add to your games</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
