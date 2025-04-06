import { useState } from "react"

export default function useSearchFilter() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedGenre, setSelectedGenre] = useState("")

    return {
        searchTerm,
        setSearchTerm,
        selectedGenre,
        setSelectedGenre
    }
}