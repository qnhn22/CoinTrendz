import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './index.css'
import Home from './routes/Home'
import DetailView from './routes/DetailView'
import CoinDetail from './components/CoinDetail'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} >
        <Route index={true} element={<App />} />
        <Route index={false} path="/CoinDetail/:id" element={<DetailView />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
