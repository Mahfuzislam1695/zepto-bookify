export interface Author {
    name: string
    birth_year: number | null
    death_year: number | null
}

export type IGenericErrorMessage = {
    path: string | number;
    message: string;
};

export interface Book {
    id: number
    title: string
    authors: Author[]
    translators: Author[]
    subjects: string[]
    bookshelves: string[]
    languages: string[]
    copyright: boolean | null
    media_type: string
    formats: Record<string, string>
    download_count: number
}

export interface BooksResponse {
    count: number
    next: string | null
    previous: string | null
    results: Book[]
}