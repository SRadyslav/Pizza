import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedCategory: 0,
    orderType: 'asc',
    selectedSort: {
        name: 'popularity',
        sortType: 'rating'
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload
        },
        setSelectedSort(state, action) {
            state.selectedSort = action.payload
        },
        setOrderType(state, action) {
            state.orderType = action.payload
        }
    },
})


export const { setSelectedCategory, setSelectedSort, setOrderType } = filterSlice.actions

export default filterSlice.reducer