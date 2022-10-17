import React from 'react'
import {useDispatch} from 'react-redux'

import { setOrderType } from '../redux/slices/filterSlice'



const Sort = ({ selectedSort, onChangeSort }) => {

    const dispatch = useDispatch()
    const onButtonClick = (payload) => {
        dispatch(setOrderType(payload))
    }
    const [isVisible, setIsVisible] = React.useState(false)
    const list = [{ name: "popularity", sortType: "rating" },
    { name: "price", sortType: "price" },
    { name: "name", sortType: "title" }
    ]

    const selectItem = (index) => {
        onChangeSort(index)
        setIsVisible(false)
    }

    return (
        <div className="sort">
            <div className="sort__label">

                <b>sorting by:</b>
                <span onClick={() => { setIsVisible(!isVisible) }}>{selectedSort.name}</span>
                <button onClick={() => onButtonClick('asc')}> ↑ </button>
                <button onClick={() => onButtonClick('desc')}> ↓ </button>
            </div>
            {isVisible && <div className="sort__popup">
                <ul>
                    {list.map((obj) => {
                        return <li key={obj.name}
                            className={obj.name === selectedSort.name ? "active" : ""}
                            onClick={() => selectItem(obj)}>{obj.name}</li>
                    })}
                </ul>
            </div>}
        </div>
    )
}

export default Sort;