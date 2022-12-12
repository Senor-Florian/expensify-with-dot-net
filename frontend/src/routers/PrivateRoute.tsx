import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAppSelector } from '../hooks/hooks';

const PrivateRoute = ({ children = {} }) => {
  const isAuthenticated = useAppSelector(state => !!state.auth.uid);

  return isAuthenticated ? (
    <>
      <Header />
      {children}
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;