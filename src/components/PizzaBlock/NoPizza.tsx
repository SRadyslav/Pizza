import React from 'react'

export const NoPizza: React.FC = () => {
    return (
        <div className="content__error-info" >
            <h2>Sorry</h2>
            <p>
                Server errors<br />
                Try to visit site later
            </p>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu7TvEBXVEKRKoHyuDcFH-JtMOAzt64cFy7Q&usqp=CAU" alt="Empty cart" />
        </div>

    )
}

