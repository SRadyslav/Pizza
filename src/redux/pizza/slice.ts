import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchExactPizza, fetchPizza } from './API'
import { Pizza, PizzaSliceState, Status } from './types'


const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, 
    pizzaById: null as Pizza
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchPizza.pending, (state) => {
            state.status = Status.LOADING
            state.items = []
        })
        builder.addCase(fetchPizza.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCESS
        })
        builder.addCase(fetchExactPizza.pending, (state) => {
            state.status = Status.LOADING
            state.pizzaById = null
        })
        builder.addCase(fetchExactPizza.fulfilled, (state, action) => {
            state.pizzaById = action.payload
            state.status = Status.SUCCESS
        })
        builder.addCase(fetchExactPizza.rejected, (state) => {
            state.pizzaById = null
            state.status = Status.ERROR
        })
        }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer