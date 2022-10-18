import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'

import Categories from '../components/Categories'
import Sort, { sortList } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock/index.jsx'
import { Dummy } from '../components/PizzaBlock/Dummy';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setSelectedCategory, setSelectedSort, setCurrentPage, setFilter } from '../redux/slices/filterSlice'



export const Home = () => {
    const { searchValue } = React.useContext(SearchContext)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const { selectedCategory, selectedSort, orderType, currentPage } = useSelector(state => state.filter)

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)
    const limit = 4

    const fetchPizzas = () => {
        const category = selectedCategory > 0 ? `category=${selectedCategory}` : ''
        const search = searchValue === '' ? '' : `search=${searchValue}`

        setIsLoading(true)
        axios.get(`https://634bdb48317dc96a308c1d66.mockapi.io/items?page=${currentPage}&limit=${limit}&${category
            }&sortBy=${selectedSort.sortType}&order=${orderType}&${search}`)
            .then((res) => {
                setItems(res.data)
                setIsLoading(false)
            })
    }
    ///do this actions only if there was first render and parameters was changed
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                selectedCategory,
                sortType: selectedSort.sortType,
                orderType,
                searchValue,
                currentPage,
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [selectedCategory, selectedSort.sortType, orderType, searchValue, currentPage])

    //if there was first render then check URL-parameters and save in store
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortList.find(obj => obj.sortType === params.sortType)
            dispatch(setFilter({
                ...params,
                sort
            }
            ))
            isSearch.current = true
        }
    }, [])

    //if there was first render then request pizzas
    React.useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            fetchPizzas()
        }
        isSearch.current = false
    }, [selectedCategory, selectedSort.sortType, orderType, searchValue, currentPage])


    const onChangeFilter = (payload, action) => {
        dispatch(action(payload))
    }

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
            <Pagination pageCount={3} currentPage={currentPage} onChangePage={(number) => dispatch(setCurrentPage(number))} numberOfPages={limit} />
        </div>
    )
}
