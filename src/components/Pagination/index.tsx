import React from 'react'
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss'


type PaginationProps = { pageCount:number,
    onChangePage: (page: number) => void;
    numberOfPages: string;
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onChangePage, numberOfPages, currentPage }) => {

    return (
        <ReactPaginate className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={Number(numberOfPages)}
            pageCount={pageCount}
            forcePage={currentPage - 1}
        />
    )
}

export default Pagination