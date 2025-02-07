import React from "react";
import { useAuth } from "../auth/authContext";
import ProfileLoggedIn from "./profileLoggedIn";
import ProfileLoggedOut from "./profileLoggedOut";
import Loading from "../components/loading"; // Ensure it's imported correctly

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  return user ? <ProfileLoggedIn user={user} /> : <ProfileLoggedOut />;
};

export default Profile;