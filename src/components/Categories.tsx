import React from 'react'


type CategoriesProps = {
    category: number;
    onChangeCategory: (i: number) => void
}

const categories = ['All','Meaty','Vegetarian','Grill','Spicy','Closed']


const Categories: React.FC<CategoriesProps> = ({category, onChangeCategory}) => {

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