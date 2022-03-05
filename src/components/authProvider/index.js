import React from "react";

// Local imports
import { AuthContext } from '../../components/auth/authContext';
import { accountService } from '../../_services';

export default function AuthProvider({ children }) {
  const [user, setUser] = React.useState(accountService.userValue);
  const [erm, setErm] = React.useState(null);
  const [scm, setScm] = React.useState(false);

  let signin = (email, password) => {
    return accountService.login(email, password).then((user) => {
      return setUser(user);
    });
  };

  let forgotPassword = (email) => {
    return accountService.forgotPassword(email).then(() => {
      setScm(true);
    }).catch(error => {
      setErm(error);
    });
  };

  let register = (params) => {
    return accountService.register(params).then(() => {
      setScm(true);
    }).catch((error) => {
      setErm(error);
    });
  };

  let signout = () => {
    accountService.logout();
    setUser(null);
  };

  let value = { user, signin, signout, forgotPassword, register, erm, scm };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
