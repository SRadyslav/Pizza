import React from 'react'


const categories = [
    'All',
    'Meaty',
    'Vegetarian',
    'Grill',
    'Spicy',
    'Closed',
]

const Categories = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <div className="categories">
            <ul>
                {/* <li onClick={()=>{}} className="active">Все</li> */}
                {categories.map((p, i) => (<li onClick={() => setActiveIndex(i)}
                        key={i}
                        className={activeIndex === i ? "active" : ""}>{p}</li>
                ))
                }
            </ul>
        </div>
    )
}

export default Categories;