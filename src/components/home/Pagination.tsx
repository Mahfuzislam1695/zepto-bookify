"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = []
        const maxPagesToShow = 5

        if (totalPages <= maxPagesToShow) {
            // Show all pages if there are fewer than maxPagesToShow
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always show first page
            pages.push(1)

            // Calculate start and end of page range
            let start = Math.max(2, currentPage - 1)
            let end = Math.min(totalPages - 1, currentPage + 1)

            // Adjust if we're near the beginning
            if (currentPage <= 3) {
                end = Math.min(totalPages - 1, maxPagesToShow - 1)
            }

            // Adjust if we're near the end
            if (currentPage >= totalPages - 2) {
                start = Math.max(2, totalPages - maxPagesToShow + 2)
            }

            // Add ellipsis if needed at the beginning
            if (start > 2) {
                pages.push("...")
            }

            // Add middle pages
            for (let i = start; i <= end; i++) {
                pages.push(i)
            }

            // Add ellipsis if needed at the end
            if (end < totalPages - 1) {
                pages.push("...")
            }

            // Always show last page
            pages.push(totalPages)
        }

        return pages
    }

    const pageNumbers = getPageNumbers()

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md divide-x divide-gray-200 dark:divide-gray-700 overflow-hidden bg-white dark:bg-gray-900">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    aria-label="Previous page"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex divide-x divide-gray-200 dark:divide-gray-700">
                    {pageNumbers.map((page, index) =>
                        typeof page === "number" ? (
                            <button
                                key={index}
                                onClick={() => onPageChange(page)}
                                className={`px-3 py-1.5 min-w-[2.5rem] text-sm font-medium transition-colors duration-200 cursor-pointer ${currentPage === page
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                            >
                                {page}
                            </button>
                        ) : (
                            <span key={index} className="px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
                                {page}
                            </span>
                        ),
                    )}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    aria-label="Next page"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}