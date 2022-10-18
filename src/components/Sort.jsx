import React from 'react'
import {useDispatch} from 'react-redux'

import { setOrderType } from '../redux/slices/filterSlice'


export const sortList = [{ name: "popularity", sortType: "rating" },
    { name: "price", sortType: "price" },
    { name: "name", sortType: "title" }
    ]

const Sort = ({ selectedSort, onChangeSort }) => {
    const dispatch = useDispatch()
    const sortRef = React.useRef()

    React.useEffect(()=>{
        const eventListener = (event) => {
            if(!event.path.includes(sortRef.current)) {
                setIsVisible(false)
            }
        }
        document.body.addEventListener('click', eventListener);
        return ()=>{
            document.body.removeEventListener('click', eventListener);
        }
    },[])

    const onButtonClick = (payload) => {
        dispatch(setOrderType(payload))
    }
    const [isVisible, setIsVisible] = React.useState(false)

    const selectItem = (index) => {
        onChangeSort(index)
        setIsVisible(false)
    }

    return (
        <div className="sort" ref={sortRef}>
            <div className="sort__label">

                <b>sorting by:</b>
                <span onClick={() => { setIsVisible(!isVisible) }}>{selectedSort.name}</span>
                <button onClick={() => onButtonClick('asc')}> ↑ </button>
                <button onClick={() => onButtonClick('desc')}> ↓ </button>
            </div>
            {isVisible && <div className="sort__popup">
                <ul>
                    {sortList.map((obj) => {
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