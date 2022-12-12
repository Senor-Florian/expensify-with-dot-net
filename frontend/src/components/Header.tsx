import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { GoogleLogout } from 'react-google-login';

const Header = () => {
    const dispatch = useAppDispatch();
    const displayName = useAppSelector(state => state.auth.displayName);
    const googleClientId = process.env.GOOGLE_CLIENT_ID!;
    return (
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                    <Link className="header__title" to="/dashboard">
                        <h1>Expensify</h1>
                    </Link>
                    <div>
                        <span className="header__name" >{displayName}</span>
                        <GoogleLogout
                            clientId={googleClientId}
                            buttonText="Logout"
                            onLogoutSuccess={() => {
                                dispatch(logout());
                            }}
                        />
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;