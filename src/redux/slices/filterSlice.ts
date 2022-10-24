import { createSlice, PayloadAction } from '@reduxjs/toolkit'



export enum SortProperty {
    RATING = 'rating',
    TITLE = 'title',
    PRICE = 'price'
}

export type SortListItemType = {
    name: string;
    sortBy: SortProperty;
}
export type OrderType = 'asc' | 'desc'

export interface FilterSliceState {
    searchValue: string;
    selectedCategory: number;
    order: OrderType;
    currentPage: number;
    sortBy: SortListItemType;
}

const initialState: FilterSliceState = {
    searchValue: '',
    selectedCategory: 0,
    order: 'asc',
    currentPage: 1,
    sortBy: {
        name: 'popularity',
        sortBy: SortProperty.RATING
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        },
        setSelectedCategory: (state, action: PayloadAction<number>) => {
            state.selectedCategory = action.payload
        },
        setSelectedSort(state, action: PayloadAction<SortListItemType>) {
            state.sortBy = action.payload
        },
        setOrderType(state, action: PayloadAction<OrderType>) {
            state.order = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage= action.payload
        },
        setFilter(state, action: PayloadAction<FilterSliceState>) {
            state = {...action.payload}
        }
    },
})


export const { setSelectedCategory, setSelectedSort, setOrderType, setSearchValue, setCurrentPage, setFilter} = filterSlice.actions

export default filterSlice.reducer