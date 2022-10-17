import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock/index.jsx'
import { Dummy } from '../components/PizzaBlock/Dummy';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import {setSelectedCategory, setSelectedSort} from '../redux/slices/filterSlice'


export const Home = () => {
    const {searchValue} = React.useContext(SearchContext)
    const dispatch = useDispatch()
    const onChangeFilter = (payload, action) => {
        dispatch(action(payload))
    }
    const {selectedCategory, selectedSort, orderType} = useSelector(state=> state.filter)
    
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)
    const [currentPage, setCurrentPage] = React.useState(1)
    const limit = 4


    React.useEffect(() => {
        const category = selectedCategory > 0 ? `category=${selectedCategory}` : ''
        const search = searchValue === '' ? '' : `search=${searchValue}`
        
        setIsLoading(true)
        fetch(`https://634bdb48317dc96a308c1d66.mockapi.io/items?page=${currentPage}&limit=${limit}&${category
            }&sortBy=${selectedSort.sortType}&order=${orderType}&${search}`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [selectedCategory, selectedSort, orderType, searchValue, currentPage])


    return (
        <div className="container">
            <div className="content__top">
                <Categories category={selectedCategory} onChangeCategory={(index) => onChangeFilter(index, setSelectedCategory)} />
                <Sort selectedSort={selectedSort} onChangeSort={(index) => onChangeFilter(index, setSelectedSort)} />
            </div>
            <h2 className="content__title">All Pizza</h2>
            <div className="content__items">
                {
                    isLoading ? [...new Array(6)].map((_, i) => <Dummy key={i} />)
                        : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
                }
            </div>
            <Pagination pageCount={3} onChangePage={(number) => setCurrentPage(number)} numberOfPages={limit} />
        </div>
    )
}
