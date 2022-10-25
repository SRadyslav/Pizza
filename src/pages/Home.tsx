import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import Categories from '../components/Categories'
import Sort, { sortList} from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock/index'
import { Dummy } from '../components/PizzaBlock/Dummy';
import Pagination from '../components/Pagination';
import { setSelectedCategory, setSelectedSort, setCurrentPage, setFilter, SortListItemType} from '../redux/slices/filterSlice'
import { fetchPizza, Pizza, SearchPizzaParams, Status } from '../redux/slices/pizzaSlice'
import { NoPizza } from '../components/PizzaBlock/NoPizza'
import { RootState, useAppDispatch } from '../redux/store'



export const Home: React.FC = () => {


    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isMounted = React.useRef(false)

    const { selectedCategory, sortBy, order, currentPage, searchValue } = useSelector((state: RootState) => state.filter)
    const { items, status } = useSelector((state: RootState) => state.pizza)
    const limit = '4'

    const requestPizzas = async () => {
        const category = selectedCategory > 0 ? `category=${selectedCategory}` : ''
        const search = searchValue === '' ? '' : `search=${searchValue}`
        await dispatch(
        fetchPizza({ currentPage:String(currentPage), limit, category, sortBy, order, search }))

    }
    ///do this actions only if there was first render and parameters was changed
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                selectedCategory,
                sortBy,
                order,
                searchValue,
                currentPage,
            })
            navigate(`?${queryString}`)
        }
        if(!window.location.search) {
            dispatch(fetchPizza({} as SearchPizzaParams))
        }
        isMounted.current = true
    }, [selectedCategory, sortBy, order, searchValue, currentPage])

    //if there was first render then check URL-parameters and save in store
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
            const sort = sortList.find(obj => obj === params.sortBy)
                dispatch(setFilter({ 
                    searchValue: params.search,
                    selectedCategory: Number(params.category),
                    order: params.order,
                    currentPage: Number(params.currentPage),
                    sortBy: sort || sortList[0]
                }))
        }
    }, [])

    //if there was first render then request pizzas
    React.useEffect(() => {
        window.scrollTo(0, 0)
        requestPizzas()
    }, [selectedCategory, sortBy, order, searchValue, currentPage])


    const onChangeFilter = React.useCallback( (payload: number | SortListItemType, action: typeof setSelectedCategory | typeof setSelectedSort) => {
        dispatch(action(payload as number & SortListItemType))
    }, []) // Use hook useCallback to stop rerendering Categories and Sort components every time when Home rerendered and create new this function

    return (
        <div className="container">
            <div className="content__top">
                <Categories category={selectedCategory} onChangeCategory={(index: number) => onChangeFilter(index, setSelectedCategory)} />
                <Sort selectedSort={sortBy} onChangeSort={(index: SortListItemType) => onChangeFilter(index, setSelectedSort)} />
            </div>
            <h2 className="content__title">All Pizza</h2>
            {status == Status.ERROR ? <NoPizza />
                : (<div className="content__items"> {status == Status.LOADING ?
                    [...new Array(6)].map((_, i) => <Dummy key={i} />)
                    : items.map((obj: Pizza) => <PizzaBlock key={obj.id} {...obj} />)}
                </div>)
            }

            <Pagination pageCount={3} currentPage={currentPage} onChangePage={(number) => dispatch(setCurrentPage(number))} numberOfPages={limit} />
        </div>
    )
}
