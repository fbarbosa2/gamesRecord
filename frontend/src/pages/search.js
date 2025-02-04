import React from "react";
import useSearchGames from "../hooks/searchHooks";
import { useAuth } from "../auth/authContext";

const Search = () => {
    const { games, searchQuery, setSearchQuery, handleSearch, loading, error } = useSearchGames();

    const { user } = useAuth();
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
                        {user ? <button className="add-game-button" onClick={""}>+ Add to your games</button> : null}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;