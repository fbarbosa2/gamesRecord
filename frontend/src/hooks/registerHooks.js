import { useState } from "react";
import axios from "axios";

const UseRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    console.log("chegou aqui 1");

    const registerUser = async (email, password, confirmPassword) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://localhost:5000/api/register", {
                email,
                password,
                confirmPassword
            });
            console.log("chegou aqui 2");
            //return response.data;
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return { registerUser, loading, error };
};

export default UseRegister;