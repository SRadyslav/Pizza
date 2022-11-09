import React from 'react'
import { useSelector} from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { Dummy } from '../components/PizzaBlock/Dummy'
import { fetchExactPizza } from '../redux/pizza/API'
import { RootState, useAppDispatch } from '../redux/store'


const PizzaById: React.FC = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams()
    const pizza = useSelector((state: RootState) => state.pizza.pizzaById)

    React.useEffect(() => {
    dispatch(fetchExactPizza(Number(id)))
    }, [])



    if (!pizza) {
        return <Dummy />
    }
    return (
        <div className="container">
            <div className="pizzaById">
                <h2 className="content__title">{pizza.title}</h2>
                <img src={pizza.imageUrl} style={{width: "40%"}} />
                <h3>{pizza.price} ₽</h3>
                <Link to="/" className="button button--black">
                        <span>back</span>
                </Link>
            </div>
        </div>
    )
}

export default PizzaById
