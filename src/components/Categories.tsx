import React from 'react'


type CategoriesProps = {
    category: number;
    onChangeCategory: (i: number) => void
}

const categories = ['All','Meaty','Vegetarian','Grill','Spicy','Closed']


export const Categories: React.FC<CategoriesProps> = React.memo(({category, onChangeCategory}) => {
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
})
