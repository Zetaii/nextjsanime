import React, { useState, ChangeEvent, useEffect } from "react"
import { searchAnimeByTitle, AnimeData } from "../app/watchlist/search"

interface SearchBarProps {
  onSearch: (term: string) => void
  suggestions: string[]
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, suggestions }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showDropdown, setShowDropdown] = useState(true)

  useEffect(() => {
    // Fetch suggestions when the component mounts
    onSearch(searchTerm)
  }, []) // Empty dependency array means this effect runs only once, on mount

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    setShowDropdown(!!term)
    onSearch(term)
  }

  const handleSearch = () => {
    onSearch(searchTerm)
  }

  return (
    <div className="relative flex items-center justify-end">
      <input
        type="text"
        id="searchInput"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search for anime..."
        className="mr-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>

      {showDropdown && suggestions.length > 0 && (
        <div>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchBar
