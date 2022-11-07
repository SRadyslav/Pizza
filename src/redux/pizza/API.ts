import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { Pizza, SearchPizzaParams } from "./types"


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