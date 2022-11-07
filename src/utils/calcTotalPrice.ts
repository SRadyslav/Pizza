import { CartItemType } from "../redux/cart/types"


export const calcTotalPrice = (items: CartItemType[]) => {
return (
    items.reduce((prevSum, obj) => {
        return (obj.price * obj.count) + prevSum
    }, 0)
)
}
