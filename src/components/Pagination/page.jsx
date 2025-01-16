import React from 'react'

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const goToNextPage = () => {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const goToPrevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }

    return (

        <>
            <nav className="flex justify-center items-center gap-x-1 m-2 mb-4" aria-label="Pagination">
                {/* <button
                    type="button"
                    className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                    aria-label="Previous"
                    onClick={goToPrevPage}
                >
                    <svg
                        aria-hidden="true"
                        className="hidden shrink-0 size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    <span>Previous</span>
                </button> */}
                <div className="flex items-center gap-x-1">
                    {
                        pageNumbers.map((pgNumber, index) => (
                            <button
                            key={index}
                                type="button"
                                className="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                                aria-current="page"
                                onClick={() => setCurrentPage(pgNumber)}  
                            >
                                {pgNumber}
                            </button>
                        ))
                    }

                </div>
                {/* <button
                    type="button"
                    className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                    aria-label="Next"
                    onClick={goToNextPage}
                >
                    <span>Next</span>
                    <svg
                        aria-hidden="true"
                        className="hidden shrink-0 size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </button> */}
            </nav>
        </>
    )
}

export default Pagination