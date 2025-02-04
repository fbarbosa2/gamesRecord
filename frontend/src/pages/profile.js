import React from "react";
import { useAuth } from "../auth/authContext";
import ProfileLoggedIn from "./profileLoggedIn";
import ProfileLoggedOut from "./profileLoggedOut";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user ? <ProfileLoggedIn user={user} /> : <ProfileLoggedOut />;
};

export default Profile;
