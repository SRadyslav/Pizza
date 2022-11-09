import React from 'react';
import { Route, Routes } from "react-router-dom";

import './App.css';
import './scss/app.scss'
import Header from './components/Header'
import { Home } from './pages/Home';
import preloader from './assets/img/preloader.svg'

const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound"*/ './pages/NotFound'));
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart"*/ './pages/Cart'));
const PizzaById = React.lazy(() => import(/* webpackChunkName: "PizzaById"*/ './pages/PizzaById'));

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <React.Suspense fallback={preloader}>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/pizza/:id' element={<PizzaById />} ></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </React.Suspense>
      </div>
    </div>
  );
}

export default App;
