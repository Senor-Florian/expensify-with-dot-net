import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';

const PublicRoute = ({ children = {} }) => {
    const isAuthenticated = useAppSelector(state => !!state.auth.uid);

    return <>{isAuthenticated ? (
        <Navigate to='/dashboard' />
    ) : (
        children
    )}
    </>
};

export default PublicRoute;