import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserGameById, updateGameDetails } from "../data/userData";
import { useAuth } from "../auth/authContext";

const GameDetails = () => {
    const { gameId } = useParams();
    const { user } = useAuth();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        if (!user) return;

        const fetchGame = async () => {
            try {
                const userGame = await getUserGameById(user.uid, gameId);
                if (userGame) {
                    setGame(userGame);
                    setRating(userGame.rating);
                    setFinished(userGame.finished);
                }
            } catch (error) {
                console.error("Error fetching user game:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGame();
    }, [user, gameId]);

    const handleSaveChanges = async (e) => {
        if (!user) return;

        e.preventDefault();
        await updateGameDetails(user.uid, gameId, { rating, finished });
        window.location.href = "/mygames";
    }

    if (loading) return <p>Loading...</p>;
    if (!game) return <p>Game not found.</p>; // Handle case where game isn't found

    return (
        <div>
            <h1>{game.name}</h1>
            <img src={game.background_image} alt={game.name} />
            <p>{game.description}</p>
            
            <form onSubmit={handleSaveChanges}>
                <label htmlFor="finished">Finished:</label>
                <input 
                    type="checkbox" 
                    id="finished" 
                    name="finished" 
                    checked={finished} 
                    onChange={(e) => setFinished(e.target.checked)} 
                />
                
                <label htmlFor="rating">Rating:</label>
                <input 
                    type="number" 
                    id="rating" 
                    name="rating" 
                    min={0} 
                    max={10} 
                    value={rating} 
                    onChange={(e) => setRating(Number(e.target.value))}
                />
                
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default GameDetails;
