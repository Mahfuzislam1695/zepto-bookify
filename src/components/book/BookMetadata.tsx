import { BookOpen, Globe, Tag } from "lucide-react"
import type { Book } from "@/types"

interface BookMetadataProps {
    book: Book
}

export default function BookMetadata({ book }: BookMetadataProps) {
    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {book.subjects.length > 0 && (
                <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                    <div className="flex items-center mb-3">
                        <Tag className="h-4 w-4 text-primary mr-2" />
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">Subjects</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {book.subjects.map((subject, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-secondary text-primary text-opacity-90"
                            >
                                {subject}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {book.bookshelves.length > 0 && (
                <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <div className="flex items-center mb-3">
                        <BookOpen className="h-4 w-4 text-primary mr-2" />
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">Bookshelves</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {book.bookshelves.map((bookshelf, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-secondary text-primary text-opacity-90"
                            >
                                {bookshelf}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {book.languages.length > 0 && (
                <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                    <div className="flex items-center mb-3">
                        <Globe className="h-4 w-4 text-primary mr-2" />
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">Languages</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {book.languages.map((language, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-secondary text-primary text-opacity-90"
                            >
                                {language.toUpperCase()}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <h3 className="text-base font-medium text-gray-900 dark:text-white mb-3">Details</h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div className="col-span-1">
                        <dt className="text-gray-500 dark:text-gray-400">ID</dt>
                        <dd className="mt-1 text-gray-900 dark:text-white font-medium">{book.id}</dd>
                    </div>
                    <div className="col-span-1">
                        <dt className="text-gray-500 dark:text-gray-400">Downloads</dt>
                        <dd className="mt-1 text-gray-900 dark:text-white font-medium">{book.download_count.toLocaleString()}</dd>
                    </div>
                    <div className="col-span-1">
                        <dt className="text-gray-500 dark:text-gray-400">Media Type</dt>
                        <dd className="mt-1 text-gray-900 dark:text-white font-medium">{book.media_type}</dd>
                    </div>
                    <div className="col-span-1">
                        <dt className="text-gray-500 dark:text-gray-400">Copyright</dt>
                        <dd className="mt-1 text-gray-900 dark:text-white font-medium">
                            {book.copyright === true ? "Yes" : book.copyright === false ? "No (Public Domain)" : "Unknown"}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

