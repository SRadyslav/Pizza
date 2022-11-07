import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { CartItemType, CartSliceState } from './types';


const {items, totalPrice} = getCartFromLS()
const initialState: CartSliceState = {
    totalPrice,
    items
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItems(state, action: PayloadAction<CartItemType>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({ ...action.payload, count: 1 })
            }

            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((obj) => obj.id === action.payload)
            if (findItem) {
                findItem.count--
            }
            state.totalPrice = state.totalPrice - findItem.price
        },
        removeItems(state, action: PayloadAction<string>) {
            const item = state.items.find((obj) => obj.id === action.payload)
            state.items = state.items.filter((obj) => obj.id != action.payload)
            state.totalPrice = state.totalPrice - (item.price * item.count)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        },
    }
})




export const { addItems, clearItems, minusItem, removeItems } = cartSlice.actions

export default cartSlice.reducer