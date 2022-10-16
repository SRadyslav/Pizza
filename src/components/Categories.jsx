import React from 'react'


const categories = [
    'All',
    'Meaty',
    'Vegetarian',
    'Grill',
    'Spicy',
    'Closed',
]

const Categories = ({category, onChangeCategory}) => {
    return (
        <div className="categories">
            <ul>
                {categories.map((value, i) => (<li onClick={() => onChangeCategory(i)}
                        key={value}
                        className={category === i ? "active" : ""}>{value}</li>
                ))
                }
            </ul>
        </div>
    )
}

export default Categories;