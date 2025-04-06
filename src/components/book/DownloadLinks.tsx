import { BookOpen, Download, Globe } from "lucide-react"
import type { Book } from "@/types"

interface DownloadLinksProps {
    book: Book
}

export default function DownloadLinks({ book }: DownloadLinksProps) {
    // Get download links
    const getDownloadLinks = () => {
        const downloadFormats = [
            { mime: "text/html", label: "HTML", icon: Globe },
            { mime: "application/epub+zip", label: "EPUB", icon: BookOpen },
            { mime: "text/plain", label: "Plain Text", icon: BookOpen },
            { mime: "application/pdf", label: "PDF", icon: BookOpen },
        ]

        return downloadFormats
            .filter((format) => {
                // Find any format that starts with the mime type
                return Object.keys(book.formats).some((key) => key.startsWith(format.mime))
            })
            .map((format) => {
                // Get the URL for the first matching format
                const key = Object.keys(book.formats).find((key) => key.startsWith(format.mime))
                return {
                    label: format.label,
                    url: key ? book.formats[key] : "",
                    icon: format.icon,
                }
            })
    }

    const downloadLinks = getDownloadLinks()

    if (downloadLinks.length === 0) return null

    return (
        <div className="bg-white dark:bg-gray-900 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 p-4 animate-fade-in">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Download Book</h3>
            <div className="space-y-2">
                {downloadLinks.map((link, index) => {
                    const Icon = link.icon
                    return (
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-2 border border-gray-200 dark:border-gray-700 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 w-full transition-colors duration-200 group"
                        >
                            <Icon className="h-4 w-4 mr-2 text-primary" />
                            {link.label}
                            <Download className="h-4 w-4 ml-auto text-gray-400 group-hover:text-primary transition-colors duration-200" />
                        </a>
                    )
                })}
            </div>
        </div>
    )
}

