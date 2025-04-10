"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface FilterDropdownProps {
    genres: string[]
    selectedGenre: string
    onGenreChange: (genre: string) => void
}

export default function FilterDropdown({ genres, selectedGenre, onGenreChange }: FilterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative w-full ">
            <button
                type="button"
                className="relative w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="block truncate">{selectedGenre || "All Genres"}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
                    />
                </span>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-900 shadow-lg rounded-md py-1 text-base focus:outline-none sm:text-sm border border-gray-200 dark:border-gray-700 animate-fade-in">
                    <div
                        className="max-h-96 overflow-y-auto" // Increased max height and scrollable
                        role="listbox"
                    >
                        <button
                            onClick={() => {
                                onGenreChange("")
                                setIsOpen(false)
                            }}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 ${!selectedGenre ? "text-primary font-medium" : "text-gray-900 dark:text-white"}`}
                            role="option"
                            aria-selected={!selectedGenre}
                        >
                            All Genres
                        </button>

                        {genres.map((genre) => (
                            <button
                                key={genre}
                                onClick={() => {
                                    onGenreChange(genre)
                                    setIsOpen(false)
                                }}
                                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 ${selectedGenre === genre ? "text-primary font-medium" : "text-gray-900 dark:text-white"}`}
                                role="option"
                                aria-selected={selectedGenre === genre}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}