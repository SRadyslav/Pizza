import React from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock/index.jsx'
import { Dummy } from '../components/PizzaBlock/Dummy';


export const Home = () => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        fetch(`https://626d16545267c14d5677d9c2.mockapi.io/items`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr.slice(0, 10))
                setIsLoading(false)
            })
        window.scrollTo(0,0)
    }, [])
    return (
            <div className="container">
                <div className="content__top">
                    <Categories />
                    <Sort />
                </div>
                <h2 className="content__title">All Pizza</h2>
                <div className="content__items">
                    {
                        isLoading ? [...new Array(6)].map((_, i) => <Dummy key={i} />)
                            : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
                    }
                </div>
            </div>
    )
}
