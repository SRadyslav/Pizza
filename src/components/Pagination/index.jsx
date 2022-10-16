import React from 'react'
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss'

const Pagination = ({pageCount, onChangePage, numberOfPages}) => {

    return (
            <ReactPaginate className={styles.root}
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={(event)=>onChangePage(event.selected + 1)}
                pageRangeDisplayed={numberOfPages}
                pageCount={pageCount}
                
                renderOnZeroPageCount={null}
            />
    )
}

export default Pagination