import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './routes/Main'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './index.css'
import Home from './routes/Home'
import DetailView from './routes/DetailView'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} >
        <Route index={true} element={<Main />} />
        <Route index={false} path="/CoinDetail/:id" element={<DetailView />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
