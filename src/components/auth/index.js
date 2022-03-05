import React from "react";
import { AuthContext } from './authContext';

export default function useAuth() {
  return React.useContext(AuthContext);
}
