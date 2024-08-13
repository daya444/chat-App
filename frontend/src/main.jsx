import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthContextProvider } from './context/authcontext.jsx'
import './index.css'
import {SocketContextProvider} from './context/socketContext'

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <React.StrictMode>
      <AuthContextProvider>
        <SocketContextProvider>
           <App/>
        </SocketContextProvider>
      </AuthContextProvider>
    </React.StrictMode>,
  </BrowserRouter>
  
)
