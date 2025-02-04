import React, { useState, useEffect } from "react";
import { getUserGames } from "../data/userData";
import { useAuth } from "../auth/authContext";
import { CiStar } from "react-icons/ci";

const MyGames = () => {
    const { user } = useAuth();
    const [games, setGames] = useState([]); // State to store games
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        if (!user) return; // Don't fetch if no user

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
    }, [user]); // Runs when `user` changes

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <div id="my-games-header">
                <h1>My Games</h1>
                <p>Here you can see the games you have saved.</p>
            </div>
            <div className="my-games" onClick={""}>
                {games.length > 0 ? (
                    games.map((game) => (
                        <div key={game.id} className="my-game-card">
                            <img src={game.background_image} alt={game.name} />
                            <h2>{game.name}</h2>
                            <p>{game.description}</p>
                            <p>Your Rating: {game.rating} <CiStar /></p>
                            <p>Finished: {game.finished ? "Yes" : "No"}</p>
                        </div>
                    ))
                ) : (
                    <p>No games saved yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyGames;
