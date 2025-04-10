"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const LANGUAGES = [
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    // Add more languages as needed
]

interface LanguageFilterProps {
    selectedLanguages: string[]
    onLanguageChange: (languages: string[]) => void
}

export default function LanguageFilter({ selectedLanguages, onLanguageChange }: LanguageFilterProps) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleLanguage = (code: string) => {
        if (selectedLanguages.includes(code)) {
            onLanguageChange(selectedLanguages.filter(l => l !== code))
        } else {
            onLanguageChange([...selectedLanguages, code])
        }
        // Close the dropdown after selection
        setIsOpen(false)
    }

    return (
        <div className="relative">
            <button
                type="button"
                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="block truncate">
                    {selectedLanguages.length > 0
                        ? selectedLanguages.map(code =>
                            LANGUAGES.find(l => l.code === code)?.name).join(", ")
                        : "All Languages"}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`} />
                </span>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-900 shadow-lg rounded-md py-1 text-base overflow-auto max-h-60 focus:outline-none sm:text-sm border border-gray-200 dark:border-gray-700">
                    {LANGUAGES.map((language) => (
                        <div
                            key={language.code}
                            className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 cursor-pointer"
                            onClick={() => toggleLanguage(language.code)}
                        >
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedLanguages.includes(language.code)}
                                    readOnly // Make it controlled
                                    className="rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                />
                                <span className="text-gray-900 dark:text-white">{language.name}</span>
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}