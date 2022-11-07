import React from 'react'
import {useDispatch} from 'react-redux'
import { setOrderType } from '../redux/filter/slice';
import { OrderType, SortListItemType, SortProperty } from '../redux/filter/types';


export const sortList: SortListItemType[] = [{ name: 'popularity', sortBy: SortProperty.RATING },
    { name: 'price', sortBy: SortProperty.PRICE },
    { name: 'name', sortBy: SortProperty.TITLE}
]

type SortProps = {
    selectedSort: SortListItemType;
    onChangeSort: (index: SortListItemType) => void;
}
type PopupClick = MouseEvent & {
    path: Node[];
};

const Sort: React.FC<SortProps> = React.memo(({ selectedSort,  onChangeSort }) => {
    const dispatch = useDispatch()
    const sortRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(()=>{
        const eventListener = (event: PopupClick) => {
            if(sortRef.current && !event.path.includes(sortRef.current)) {
                setIsVisible(false)
            }
        }
        document.body.addEventListener('click', eventListener);
        return ()=> {
            document.body.removeEventListener('click', eventListener);
        }
    },[])

    const onButtonClick = (payload: OrderType) => {
        dispatch(setOrderType(payload))
    }
    const [isVisible, setIsVisible] = React.useState(false)

    const selectItem = (index:SortListItemType) => {
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
})



export default Sort;