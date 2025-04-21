// import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'fastbootstrap/dist/css/fastbootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import './assets/styles/css/main.css'
import './assets/styles/sass/main.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { APIProvider } from './contexts/APIContext'
import { ThemeProvider } from './contexts/ThemeContext'

// localStorage.removeItem('token')
// sessionStorage.removeItem('token')

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HashRouter>
            <ThemeProvider>
                <APIProvider>
                    <App />
                </APIProvider>
            </ThemeProvider>
        </HashRouter>
    </React.StrictMode>
)
