import { createSlice } from '@reduxjs/toolkit'
import { sum } from 'lodash'

const initialState = {
    totalPrice: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItems(state, action) {
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
        minusItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload)
            if (findItem) {
                findItem.count--
            }
            state.totalPrice = state.totalPrice - findItem.price
        },
        removeItems(state, action) {
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