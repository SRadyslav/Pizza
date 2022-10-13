import './App.css';
import './scss/app.scss'
import Header from './components/Header'
import Categories from './components/Categories'
import Sort from './components/Sort'
import PizzaBlock from './components/PizzaBlock.jsx'



function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
          <PizzaBlock title= "Mexico" price= "5" />
          <PizzaBlock title= "Standard" price= "4.5" />
          <PizzaBlock title= "4 cheeses" price= "5"/>
          <PizzaBlock />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
