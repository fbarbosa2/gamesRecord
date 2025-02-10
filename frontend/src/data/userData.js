import { arrayUnion, arrayRemove, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

const addGametoUser = async (uid, game) => {
    try {
        const userDoc = doc(db, "users", uid);

        await updateDoc(userDoc, {
            favoriteGames: arrayUnion(game)
        });
        return { success: true, game };
    } catch (error) {
        console.error("Error adding game to user: ", error);
        return { error: error.message };
    };
};


const removeGamefromUser = async (uid, game) => {
    try{
        const userDoc = doc(db, "users", uid);

        await updateDoc(userDoc, {
            favoriteGames: arrayRemove(game)
        });
        console.log("Game removed from user: ", game);
    } catch (error) {
        console.error("Error removing game from user: ", error);
    };
    
};

const getUserGames = async (uid) => {
    try {
        const userDoc = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDoc);

        if (userDocSnap.exists()) {
            const docData = userDocSnap.data();
            return docData.favoriteGames || [];
        } else {
            console.log("Could not find user document!");
            return [];
        }
    } catch (error) {
        console.error("Error getting user games: ", error);
        throw new Error("Failed to fetch user games"); // Throw an error if something goes wrong
    }
};


const getUserGameById = async (uid, gameId) => {
    try{
        const userDoc = doc(db,"users", uid);
        const userDocSnap = await getDoc(userDoc);
        if (userDocSnap.exists()) {
            const docData = userDocSnap.data();
            const userGames = docData.favoriteGames || [];
            return userGames.find((game) => game.id === Number(gameId));
          } else {
            console.log("Could not find user document!");
          }

    } catch (error) {
        console.error("Error getting user game by id: ", error);
    }
};

const updateGameDetails = async (uid, gameId, updatedData) => {
    try {
        const userDoc = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDoc);

        if (userDocSnap.exists()) {
            let userData = userDocSnap.data();
            let games = userData.favoriteGames || [];

            // Update the specific game in the array
            const updatedGames = games.map((game) =>
                game.id === Number(gameId) ? { ...game, ...updatedData } : game
            );
            

            // Save the updated array back to Firestore
            await updateDoc(userDoc, {
                favoriteGames: updatedGames
            });

            console.log("Game updated successfully!");
        } else {
            console.log("Could not find user document!");
        }
    } catch (error) {
        console.error("Error updating game details: ", error);
    }
};

const updateUserDetails = async (uid, username) => {
    try{
        const userDoc = doc(db, "users, uid");
        const userDocSnap = await getDoc(userDoc);
        if(userDocSnap.exists()){
            await updateDoc(userDoc, username);
            console.log("User details updated successfully!");
        }

    } catch (error) {
        console.error("Error updating user details: ", error);
    }
};

export {addGametoUser, removeGamefromUser, getUserGames, getUserGameById, updateGameDetails, updateUserDetails};