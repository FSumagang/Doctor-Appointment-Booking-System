import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {SnackbarProvider} from 'notistack'
import store from './redux/store.js'
import { Provider } from "react-redux"
import './assets/css/tailwind.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './context/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
        <SnackbarProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </SnackbarProvider>
      </AuthProvider>
  </BrowserRouter>
);
