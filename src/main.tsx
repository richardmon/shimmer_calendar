import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './Pages/Main.tsx'
import './index.css'

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route path="/" element={<Main />}/>
      </Routes>
    </Router>
  </React.StrictMode>,
)
