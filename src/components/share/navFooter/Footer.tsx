import { BookOpen } from 'lucide-react'
import React from 'react'

export default function Footer() {
    return (
        <footer className="mt-16 py-6 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-2">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                        <BookOpen className="h-5 w-5 text-primary mr-2" />
                        <span className="text-base font-serif font-medium text-gray-900 dark:text-white">ZeptoBookify Books</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Data provided by{" "}
                        <a
                            href="https://zeptoapps.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            zeptoapps
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
