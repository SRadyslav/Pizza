import React from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock/index.jsx'
import { Dummy } from '../components/PizzaBlock/Dummy';


export const Home = () => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)

    const [selectedCategory, setSelectedCategory] = React.useState(0);
    const [selectedSort, setSelectedSort] = React.useState({
        name: 'popularity',
        sortType: 'rating'
        })
    const [orderType, setOrderType] = React.useState("asc")

    React.useEffect(() => {
        setIsLoading(true)
        fetch(`https://634bdb48317dc96a308c1d66.mockapi.io/items?${selectedCategory > 0 ? `category=${selectedCategory}` : ''
            }&sortBy=${selectedSort.sortType}&order=${orderType}`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [selectedCategory, selectedSort, orderType])
    return (
        <div className="container">
            <div className="content__top">
                <Categories category={selectedCategory} onChangeCategory={(index) => setSelectedCategory(index)} />
                <Sort selectedSort={selectedSort} onChangeSort={(index) => setSelectedSort(index)} setOrderType={(type)=>setOrderType(type)} />
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
