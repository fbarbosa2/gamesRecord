import React, { useState } from "react";
import { useAuth } from "../auth/authContext";
import { FaGoogle } from "react-icons/fa";
import { useEmailLogin, useLogout, useGoogleLogin } from "../auth/authHooks";
import SlideInNotifications from "../components/notification";

const Login = () => {
  const { user, loading: authLoading } = useAuth();
  const [notifications, setNotifications] = useState([]);
  
  // Manage email & password state inside the component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleEmailLogin, error, loading } = useEmailLogin();
  const { handleLogout } = useLogout();

  const { handleGoogleLogin, errorG, loadingG } = useGoogleLogin();

  // Handle form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      addNotification("Please fill in all fields", "error");
      return;
    }
  
    try {
      const result = await handleEmailLogin(email, password);

      if (result.error) {
        addNotification(result.error, "error");
      } else {
        addNotification("Logged in successfully", "success");
        window.location.href = "/";
      }
    } catch (err) {
      addNotification("Error logging in: " + err.message, "error");
    }
  };

  const handleGoogleLoginPage = async () => {
    try {
      await handleGoogleLogin();

      if (!errorG) {
        addNotification("Logged in successfully", "success");
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        addNotification("Error logging in with Google: " + errorG, "error");
      }
    } catch (error) {
      addNotification("Error logging in: " + error.message, "error");
    }
  };

  const addNotification = (text, type) => {
    const id = Date.now();
    setNotifications((prev) => [{ id, text, type }, ...prev]);
  };

  const removeNotif = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  if (authLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <div className="register-login-notification">
        <SlideInNotifications notifications={notifications} removeNotif={removeNotif} />
        <div className="register-login-page">
          <h1>Login</h1>
          <form className="register-login-form" onSubmit={handleLoginSubmit}>
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="register-login-button" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <button className="google-login-button" onClick={handleGoogleLoginPage} disabled={loadingG}>
            <FaGoogle /> {loadingG ? "Logging in..." : "Login with Google"}
          </button>
          <a href="/register">Don't have an account?</a> 
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Hi {user.username}! You are already logged in. Please log out to change accounts.</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
};

export default Login;