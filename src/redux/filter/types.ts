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