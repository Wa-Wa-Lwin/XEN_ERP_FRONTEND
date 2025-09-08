import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' 
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter basename="/xenlogistic_dev"> {/* NOTE: Set base path here */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
