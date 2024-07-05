import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId='600400561126-hcggrf586pv642rdf4cv164rk6qcj8p0'>
            <App />
        </GoogleOAuthProvider>
    </React.StrictMode>
);


reportWebVitals();
