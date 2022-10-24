import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';


export type CartItemType = { 
    id: string;
    title: string;
    price: number;
    type: string;
    size: number;
    imageUrl: string;
    count: number;
}

interface CartSliceState {
    totalPrice: number;
    items: CartItemType[]
}

const initialState: CartSliceState = {
    totalPrice: 0,
    items: []
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

            state.totalPrice = state.items.reduce((prevSum, obj) => {
                return (obj.price * obj.count) + prevSum
            }, 0)
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


export const selectCartData = (state: RootState) => state.cart
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id)

export const { addItems, clearItems, minusItem, removeItems } = cartSlice.actions

export default cartSlice.reducer