import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import { } from 'react-dom';
import store from './store/store';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';
import { gapi } from "gapi-script";

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

gapi.load("client:auth2", () => {
    gapi.client.init({
        clientId: process.env.GOOGLE_CLIENT_ID,
        plugin_name: "chat",
    });
});

const root = ReactDOM.createRoot(document.getElementById('app')!);
let hasRendered = false;

const renderApp = () => {
    if (!hasRendered) {
        root.render(jsx);
        hasRendered = true;
    }
};


root.render(<LoadingPage />);
renderApp();