import React from 'react';
import ReactDOM from 'react-dom/client';
import 'jquery/dist/jquery.min.js'
// import 'sweetalert2/dist/sweetalert2.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App';
import { UserContextProvider } from './Context/UserContext.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);

