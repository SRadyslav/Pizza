import './App.css';
import './scss/app.scss'
import Header from './components/Header'
import Categories from './components/Categories'
import Sort from './components/Sort'
import PizzaBlock from './components/PizzaBlock.jsx'
import pizzas from './assets/pizza.json'



function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All Pizza</h2>
          <div className="content__items">
          {
            pizzas.map((p, i) => (
              <PizzaBlock key={i} {...p} />))
          }            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
