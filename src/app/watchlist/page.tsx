"use client"

import MaxWidthWrapper from "@/src/components/MaxWidthWrapper"
import React, { useState } from "react"
import SearchBar from "@/src/components/SearchBar" // Adjust the path as needed

interface Anime {
  id: number
  title: string
  // Add more properties if needed
}

const Page: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Anime[]>([]) // Explicitly define the type of searchResults as Anime[]

  const handleSearch = (results: Anime[]) => {
    // Explicitly define the type of results parameter as Anime[]
    setSearchResults(results)
  }

  return (
    <>
      <MaxWidthWrapper>
        <SearchBar onSearch={handleSearch} />
        {/* Display search results or any other content */}
        <ul>
          {searchResults.map(
            (
              anime: Anime // Explicitly define the type of anime as Anime
            ) => (
              <li key={anime.id}>{anime.title}</li>
            )
          )}
        </ul>
      </MaxWidthWrapper>
    </>
  )
}

export default Page
