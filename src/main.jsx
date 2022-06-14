import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './components/commom/user';
import { DbProvider } from './components/commom/Db';
import { LugarProvider } from './components/commom/lugarcontext';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <DbProvider>
          <LugarProvider>
            <App />
          </LugarProvider>
        </DbProvider>
      </UserProvider>
    </BrowserRouter>
  // </React.StrictMode>
)