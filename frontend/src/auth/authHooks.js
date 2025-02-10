import { useState } from "react";
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../data/firebase";

// Custom Hook for Email Login
const useEmailLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleEmailLogin = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setLoading(false);
            return { success: true };
        } catch (error) {
            setLoading(false);
            let errorMessage = "Error logging in. Please try again later.";
            if (error.code === "auth/invalid-credential") {
                errorMessage = "Invalid email or password.";
            } else if (error.code === "auth/user-disabled") {
                errorMessage = "Your account is disabled please contact an admin for help.";
            }
            setError(errorMessage);
            return { error: errorMessage };
        }
    };

    return { handleEmailLogin, error, loading };
};

const useGoogleLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Reference to the user's document in Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userSnapshot = await getDoc(userDocRef);

            // If the document doesn't exist, create it
            if (!userSnapshot.exists()) {
                await setDoc(userDocRef, {
                    username: user.displayName || "New User",
                    email: user.email,
                    dateCreated: new Date().toISOString(),
                    favoriteGames: []
                });
            }

            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return { handleGoogleLogin, error, loading };
};

// Custom Hook for Logout
const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogout = async () => {
        setLoading(true);
        setError(null);
        try {
            await signOut(auth);
            setLoading(false);
            window.location.href = "/login";
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return { handleLogout, loading, error };
};

// Custom Hook for Register
const useRegister = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (email, password, confirmPassword) => {
        setLoading(true);
        setError(null);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Save user info to Firestore
            await setDoc(doc(db, "users", user.uid), {
                username: "New User",
                email: user.email,
                dateCreated: new Date().toISOString(),
                favoriteGames: []
            });

            setLoading(false);
            return { success: true };
        } catch (error) {
            setLoading(false);
            let errorMessage = "Error registering. Please try again later.";
            if (error.code === "auth/email-already-in-use") {
                errorMessage = "Email is already in use.";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "Invalid email address.";
            } else if (error.code === "auth/weak-password") {
                errorMessage = "Password is too weak.";
            }
            setError(errorMessage);
            return { error: errorMessage };
        }
    };

    return { handleRegister, error, loading };
};

export { useEmailLogin, useLogout, useRegister, useGoogleLogin };
