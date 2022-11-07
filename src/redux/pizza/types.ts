import { OrderType, SortListItemType } from "../filter/types";

export type SearchPizzaParams = {
    currentPage: string; 
    limit: string; 
    category: string; 
    sortBy: SortListItemType;
    order: OrderType; 
    search: string
}

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

export interface PizzaSliceState {
    items: Pizza[];
    status: Status;
    pizzaById: Pizza
}