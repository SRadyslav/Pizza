import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { OrderType, SortListItemType } from './filterSlice';


export type SearchPizzaParams = {
    currentPage: string; 
    limit: string; 
    category: string; 
    sortBy: SortListItemType;
    order: OrderType; 
    search: string
}

export const fetchPizza = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzaStatus',
    async (params) => {
        const { currentPage, limit, category, sortBy, order, search } = params
        const  {data}  = await axios.get<Pizza[]>(`https://634bdb48317dc96a308c1d66.mockapi.io/items?page=${currentPage}&limit=${limit}&${category
            }&sortBy=${sortBy.sortBy}&order=${order}&${search}`)
        return data
    })

export const fetchExactPizza = createAsyncThunk<Pizza, number>(
    'pizza/fetchPizzaById',
    async (id) => {
        const {data} = await axios.get<Pizza>(`https://634bdb48317dc96a308c1d66.mockapi.io/items/${id}`)
        return data;
    }
)

export type Pizza = {
    id: string;
    title: string; 
    price: number;
    imageUrl: string; 
    types: number[]; 
    sizes: number[];
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: Pizza[];
    status: Status;
    pizzaById: Pizza
}

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