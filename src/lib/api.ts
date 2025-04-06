import type { BooksResponse } from "@/types"

const API_BASE_URL = 'https://gutendex.com/books'

export async function fetchBooks(page: number = 1): Promise<BooksResponse> {
    const response = await fetch(`${API_BASE_URL}?page=${page}`)

    if (!response.ok) {
        throw new Error('Failed to fetch books')
    }

    return response.json()
}