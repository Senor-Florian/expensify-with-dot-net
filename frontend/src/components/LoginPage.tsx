import React from 'react';
import { login } from '../actions/auth';
import { startSetExpenses } from '../actions/expenses';
import { useAppDispatch } from '../hooks/hooks';
import GoogleLogin, { GoogleLoginResponse }  from 'react-google-login';

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const googleClientId = process.env.GOOGLE_CLIENT_ID!;

    return (
        <div className="box-layout">
            <div className="box-layout__box">
                <h1 className="box-layout__title">Expensify</h1>
                <p>It's time to get your expenses under control</p>
                <GoogleLogin
                    clientId={googleClientId}
                    buttonText="Login with Google"
                    onSuccess={(response) => {
                        const userProfile = (response as GoogleLoginResponse).profileObj;
                        dispatch(login(userProfile.googleId, userProfile.name));
                        dispatch(startSetExpenses());
                    }}
                    onFailure={(response) => {
                        console.log(response);
                    }}
                    isSignedIn={true}
                />
            </div>
        </div>
    )
};

export default LoginPage;