import { User } from "lucide-react"
import type { Book } from "@/types"
import BookMetadata from "./BookMetadata"

interface BookInfoProps {
    book: Book
}

export default function BookInfo({ book }: BookInfoProps) {
    return (
        <div className="w-full md:w-2/3 mt-6 md:mt-0">
            <div className="bg-white dark:bg-gray-900 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-fade-in">
                <h1 className="book-title text-2xl md:text-3xl font-serif font-medium text-gray-900 dark:text-white">
                    {book.title}
                </h1>

                {book.authors.length > 0 && (
                    <div className="mt-3 flex items-center">
                        <User className="h-4 w-4 text-primary mr-2" />
                        <h2 className="book-author text-lg font-sans text-gray-700 dark:text-gray-300">
                            By{" "}
                            {book.authors.map((author, index) => (
                                <span key={author.name} className="inline-flex items-center">
                                    <span>{author.name}</span>
                                    {author.birth_year || author.death_year ? (
                                        <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                                            ({author.birth_year || "?"} - {author.death_year || "?"})
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                    {index < book.authors.length - 1 ? ", " : ""}
                                </span>
                            ))}
                        </h2>
                    </div>
                )}

                <BookMetadata book={book} />
            </div>
        </div>
    )
}

