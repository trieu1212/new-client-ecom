import React from 'react'

const Pagination = (props) => {
    const { totalRows, totalPages, handlePageClick, currentPage } = props
    return (
        <>
            <button
                className={`bg-gray-200 px-4 py-2 rounded-md hover:text-white hover:bg-main ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={currentPage === 1}
                onClick={() => handlePageClick(currentPage - 1)}
            >
                Previous
            </button>
            <button
                className={`bg-gray-200 px-4 py-2 rounded-md hover:text-white hover:bg-main ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={currentPage === totalPages}
                onClick={() => handlePageClick(currentPage + 1)}
            >
                Next
            </button>
        </>
    )
}

export default Pagination