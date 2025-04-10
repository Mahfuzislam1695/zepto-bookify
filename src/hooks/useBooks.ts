"use client"

import { useMemo } from "react"
import { useGet } from "./useGet"
import type { BooksResponse } from "@/types"
import { BOOKS_PER_PAGE } from "@/utils/constants"

interface UseBooksParams {
    page?: number
    search?: string
    topic?: string
    author_year_start?: number
    author_year_end?: number
    languages?: string[]
    sort?: 'popular' | 'ascending' | 'descending'
}

export const useBooks = (params: UseBooksParams) => {
    const {
        page = 1,
        search,
        topic,
        author_year_start,
        author_year_end,
        languages,
        sort = 'popular'
    } = params

    const queryParams = useMemo(() => {
        const p: Record<string, string> = {
            page: page.toString(),
            sort
        }

        if (search) p.search = search
        if (topic) p.topic = topic
        if (author_year_start) p.author_year_start = author_year_start.toString()
        if (author_year_end) p.author_year_end = author_year_end.toString()
        if (languages?.length) p.languages = languages.join(',')

        return p
    }, [page, search, topic, author_year_start, author_year_end, languages, sort])

    const {
        isLoading,
        data: booksData
    } = useGet<BooksResponse>(
        "https://gutendex.com/books",
        ["books", ...Object.values(queryParams)],
        queryParams
    )

    const genres = useMemo(() => {
        if (!booksData?.results) return []
        const allGenres = new Set<string>()
        booksData.results.forEach((book) => {
            book.subjects.forEach(subject => allGenres.add(subject))
            book.bookshelves.forEach(bookshelf => allGenres.add(bookshelf))
        })
        return Array.from(allGenres).sort()
    }, [booksData])

    return {
        isLoading,
        books: booksData?.results || [],
        genres,
        totalCount: booksData?.count || 0,
        totalPages: Math.ceil((booksData?.count || 0) / BOOKS_PER_PAGE),
        nextPage: booksData?.next,
        prevPage: booksData?.previous
    }
}

// "use client"

// import { useMemo } from "react"
// import { useGet } from "./useGet"
// import type { BooksResponse } from "@/types"
// import { BOOKS_PER_PAGE } from "@/utils/constants"

// export const useBooks = (currentPage: number, searchTerm?: string, selectedGenre?: string) => {
//     const queryParams = useMemo(() => {
//         const params: Record<string, unknown> = { page: currentPage }
//         if (searchTerm) params.search = searchTerm
//         if (selectedGenre) {
//             // Use topic parameter for genre filtering
//             params.topic = selectedGenre
//         }
//         return params
//     }, [currentPage, searchTerm, selectedGenre])

//     const {
//         isLoading,
//         data: booksData
//     } = useGet<BooksResponse>(
//         "https://gutendex.com/books",
//         ["books", currentPage.toString(), searchTerm || "", selectedGenre || ""],
//         queryParams
//     )

//     // Memoized derived state
//     const books = useMemo(() => booksData?.results || [], [booksData])
//     const totalPages = useMemo(
//         () => Math.ceil((booksData?.count || 0) / BOOKS_PER_PAGE),
//         [booksData]
//     )

//     // Extract and memoize unique genres from initial load
//     const genres = useMemo(() => {
//         if (searchTerm || selectedGenre) return [] // Don't extract genres when searching/filtering
//         const allGenres = new Set<string>()
//         books.forEach((book) => {
//             book.subjects.forEach(subject => allGenres.add(subject))
//             book.bookshelves.forEach(bookshelf => allGenres.add(bookshelf))
//         })
//         return Array.from(allGenres).sort()
//     }, [books, searchTerm, selectedGenre])

//     return {
//         isLoading,
//         books,
//         totalPages,
//         genres,
//         totalCount: booksData?.count || 0
//     }
// }