import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Login'
import './samples/node-api'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
