import React from 'react'
import { Link } from 'react-router-dom'

import emptyImg from '../assets/img/empty-cart.png'

const EmptyCart = () => {
    return (
        <div className="container container--cart">
            <div className="cart cart--empty">
                <h2>Cart is empty <span className='icon'>☹️</span></h2>
                <p>
                    You probably haven't ordered pizza yet.<br />
                    To order pizza, go to the main page.
                </p>
                <img src={emptyImg} alt="Empty cart" />
                <Link to="/" className="button button--black">
                    <span>back</span>
                </Link>
            </div>
        </div>
    )
}

export default EmptyCart
