import React from 'react'
import { Link } from 'react-router-dom'

import emptyImg from '../assets/img/empty-cart.png'

const EmptyCart = () => {
    return (
        <div class="container container--cart">
            <div class="cart cart--empty">
                <h2>Cart is empty <icon>☹️</icon></h2>
                <p>
                    You probably haven't ordered pizza yet.<br />
                    To order pizza, go to the main page.
                </p>
                <img src={emptyImg} alt="Empty cart" />
                <Link to="/" class="button button--black">
                    <span>back</span>
                </Link>
            </div>
        </div>
    )
}

export default EmptyCart
