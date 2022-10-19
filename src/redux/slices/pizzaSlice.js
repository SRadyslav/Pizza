import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizza = createAsyncThunk(
    'pizza/fetchPizzaStatus',
    async (params) => {
        const { currentPage, limit, category, selectedSort, orderType, search } = params
        const { data } = await axios.get(`https://634bdb48317dc96a308c1d66.mockapi.io/items?page=${currentPage}&limit=${limit}&${category
            }&sortBy=${selectedSort.sortType}&order=${orderType}&${search}`)
        return data
    })


const initialState = {
    items: [],
    status: 'loading' //'loading' | 'error' | 'success'
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
    },
    extraReducers: {
        [fetchPizza.pending]: (state, action) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizza.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizza.rejected]: (state, action) => {
            state.status = 'error'
            state.items = []
        }
    }
})


export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer