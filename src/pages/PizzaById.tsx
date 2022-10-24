import React from 'react'
import { useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { Dummy } from '../components/PizzaBlock/Dummy'
import { fetchExactPizza } from '../redux/slices/pizzaSlice'
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
            <h2>{pizza.title}</h2>
            <img src={pizza.imageUrl} />
            <h3>{pizza.price} ₽</h3>
        </div>
    )
}

export default PizzaById
