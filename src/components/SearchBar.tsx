import React, { useState } from "react"
import { fetchAnime } from "../app/action"

const MAX_LIMIT = 8

interface Anime {
  id: number
  title: string
  // Add more properties if needed
}

interface SearchBarProps {
  onSearch: (results: Anime[]) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSearch = async () => {
    try {
      // Fetch anime data based on the search term
      const response = await fetchAnime(1) // Assuming you always start from page 1
      const results: Anime[] = response.animes // Adjust according to the structure of the response

      // Pass the results to the parent component
      onSearch(results)
    } catch (error) {
      console.error("Error searching for anime:", error)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSearch()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for anime..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar
