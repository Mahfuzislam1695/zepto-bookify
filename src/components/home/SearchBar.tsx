"use client"

import { Search, X } from "lucide-react"
import { useState, useRef } from "react"

interface SearchBarProps {
    searchTerm: string
    onSearchChange: (value: string) => void
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    // Clear search
    const handleClear = () => {
        onSearchChange("")
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    return (
        <div className="relative w-full max-w-md">
            <div
                className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${isFocused ? "text-primary" : "text-gray-400"}`}
            >
                <Search className="h-4 w-4" />
            </div>
            <input
                ref={inputRef}
                type="text"
                className="block w-full pl-9 pr-9 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {searchTerm && (
                <button onClick={handleClear} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200" />
                </button>
            )}
        </div>
    )
}

