import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import { createBrowserHistory } from 'history';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

export const history = createBrowserHistory();

const AppRouter = () => (
    <BrowserRouter>
        <>
            <Routes>
                <Route path="/" element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    } 
                />
                <Route path="/dashboard" element={
                        <PrivateRoute>
                            <ExpenseDashboardPage />
                        </PrivateRoute>
                    } 
                />
                <Route path="/create" element={
                        <PrivateRoute>
                            <AddExpensePage />
                        </PrivateRoute>
                    }  
                />
                <Route path="/edit/:id" element={
                        <PrivateRoute>
                            <EditExpensePage />
                        </PrivateRoute>
                    } 
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    </BrowserRouter>
);

export default AppRouter;