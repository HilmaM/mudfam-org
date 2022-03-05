import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

// Local imports
import AccountLayout from './AccountLayout';
import LoginPage from './Login';
import AccountNoMatch from '../components/404/accountNoMatch';

const AccountIndex = () => {
  return (
    <Routes>
      <Route element={<AccountLayout />}>
        <Route index path='login' element={<LoginPage />} />
        <Route path='*' element={<AccountNoMatch />} />
      </Route>
    </Routes>
  );
}

export default AccountIndex;