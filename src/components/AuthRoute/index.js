import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import useAuth from '../auth';

export default function AuthRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.user) {
    // Redirect them to the /Home page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}
