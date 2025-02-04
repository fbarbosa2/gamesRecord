import { useState } from "react";
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
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
            window.location.href = "/";
        } catch (error) {
            setError(error.message);
            setLoading(false);
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
        try{
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
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
            if(password !== confirmPassword) {
                setLoading(false);
                setError("Passwords do not match");
                return;
            }
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
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return { handleRegister, error, loading };
};

export { useEmailLogin, useLogout, useRegister, useGoogleLogin };
