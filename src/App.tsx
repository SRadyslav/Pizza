import React from 'react';
import { Route, Routes } from "react-router-dom";

import './App.css';
import './scss/app.scss'
import Header from './components/Header'
import { Home } from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import PizzaById from './pages/PizzaById';



function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/pizza/:id' element={<PizzaById />} ></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;