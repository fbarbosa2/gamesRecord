import React from "react";
import { useAuth } from "../context/AuthContext";
import ProfileLoggedIn from "./profileLoggedIn";
import ProfileLoggedOut from "./profileLoggedOut";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user ? <ProfileLoggedIn user={user} /> : <ProfileLoggedOut />;
};

export default Profile;
