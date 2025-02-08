import React, { useState, useEffect } from "react";
import { getUserGames } from "../data/userData";
import { useAuth } from "../auth/authContext";
import { CiStar } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const MyGames = () => {
    const { user } = useAuth();
    const [games, setGames] = useState([]); // State to store games
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }
    
        const fetchGames = async () => {
            try {
                const userGames = await getUserGames(user.uid);
                setGames(userGames);
            } catch (error) {
                console.error("Error fetching user games:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchGames();
    }, [user]);

    if (loading) return <p>Loading...</p>;
    if(!user) return <p id="logout-mygames-p">Please log in to view your games.</p>;
    return (
        <div>
            <div id="my-games-header">
                <h1>My Games</h1>
                <p>Here you can see the games you have saved.</p>
            </div>
            <div className="my-games">
                {games.length > 0 ? (
                    games.map((game) => (
                        <div key={game.id} className="my-game-card" onClick={() => navigate(`/game/${game.id}`)}>
                            <img src={game.background_image} alt={game.name} />
                            <h2>{game.name}</h2>
                            <p>{game.description}</p>
                            <p>Your Rating: {game.rating} <CiStar /></p>
                            <p>Finished: {game.finished ? "Yes" : "No"}</p>
                        </div>
                    ))
                ) : (
                    <p id="no-games-saved-p">No games saved yet :(</p>
                )}
            </div>
        </div>
    );
};

export default MyGames;
