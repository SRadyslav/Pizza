import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Dummy } from '../components/PizzaBlock/Dummy'
import { fetchExactPizza } from '../redux/slices/pizzaSlice'


const PizzaById = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const pizza = useSelector(state => state.pizza.PizzaById)

    React.useEffect(() => {
    dispatch(fetchExactPizza(id))
    }, [])



    if (pizza.length === 0) {
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
