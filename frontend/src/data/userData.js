import { arrayUnion, arrayRemove, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

const addGametoUser = async (uid, game) => {
    try{
        const userDoc = doc(db, "users", uid);

        await updateDoc(userDoc, {
            favoriteGames: arrayUnion(game)
        });
        console.log("Game added to user: ", game);
    } catch (error) {
        console.error("Error adding game to user: ", error);
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
    try{
        const userDoc = doc(db,"users", uid);
        const userDocSnap = await getDoc(userDoc);
        if (userDocSnap.exists()) {
            const docData = userDocSnap.data();
            return docData.favoriteGames || [];
          } else {
            console.log("Could not find user document!");
          }
    } catch (error) {
        console.error("Error getting user games: ", error);
    };
};

export {addGametoUser, removeGamefromUser, getUserGames};