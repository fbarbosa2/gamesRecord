import React, {useState, useEffect} from "react";
import useSearchGames from "../hooks/searchHooks";
import { useAuth } from "../auth/authContext";
import { addGametoUser } from "../data/userData";
import SlideInNotifications from "../components/notification";
import { getUserGames } from "../data/userData";

const Search = () => {
    const { games, searchQuery, setSearchQuery, handleSearch, loading, error } = useSearchGames();

    const { user } = useAuth();
    const [notifications, setNotifications] = React.useState([]);
    const [myGames, setMyGames] = useState([]);

    useEffect(() => {
        if (!user) {
            return;
        }
    
        const fetchGames = async () => {
            try {
                const userGames = await getUserGames(user.uid);
                setMyGames(userGames);
            } catch (error) {
                console.error("Error fetching user games:", error);
            }
        };
    
        fetchGames();
    }, [user]);

    const addNotification = (text, type) => {
        const id = Date.now();
        setNotifications((prev) => [{ id, text, type }, ...prev]);
    };

    const removeNotif = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const handleAddGame = async (game) => {
        if (!user) return;
    
        const gameData = {
            id: game.id || "No id available.",
            name: game.name || "No name available.",
            background_image: game.background_image || "",
            description: game.description || "No description available.",
            categories: game.categories || [],
            rating: 0,
            finished: false
        };
    
        try {
            let result = await addGametoUser(user.uid, gameData);
            if (result.error) {
                addNotification(result.error, "error");
            } else {
                addNotification("Game added successfully", "success");
            }
        } catch (error) {
            addNotification("Error adding game: " + error.message, "error");
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
                        {user ? (
                            myGames.some(favGame => favGame.id === game.id) ? (
                                <p>Already added to your games</p>
                            ) : (
                                <button className="add-game-button" onClick={() => handleAddGame(game)}>+ Add to your games</button>
                            )
                        ) : null}
                    </div>
                ))}
            </div>
            <SlideInNotifications notifications={notifications} removeNotif={removeNotif} />
        </div>
    );
};

export default Search;