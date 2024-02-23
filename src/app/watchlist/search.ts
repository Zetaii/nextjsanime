// Import React and types
import React from "react"

// Define the AnimeData interface
export interface AnimeData {
  id: number
  title: string
  image: {
    original: string
  }
}

interface SearchProps {
  onSearch: (data: AnimeData[]) => void
}

const MAX_LIMIT = 8
const DEBOUNCE_DELAY = 300
let debounceTimer: NodeJS.Timeout

export async function searchAnimeByTitle(
  title: string,
  page: number,
  { onSearch }: SearchProps
): Promise<AnimeData[]> {
  const baseEndpoint = "https://shikimori.one/api/animes?&search="
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: MAX_LIMIT.toString(),
    order: "popularity",
    search: title,
  })

  const apiUrl = `${baseEndpoint}${queryParams.toString()}`
  console.log("API URL:", apiUrl)

  try {
    // Debounce the API request
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(async () => {
      const response = await fetch(apiUrl)
      console.log("API Response:", response)

      if (!response.ok) {
        console.error(`Error fetching data. Status: ${response.status}`)
        return []
      }

      const data = await response.json()
      console.log("API Response:", data)

      // Adjust the data transformation based on the actual API response structure
      const transformedData: AnimeData[] = data.map((item: any) => ({
        id: item.id,
        title: item.name,
        image: item.image.original,
      }))

      console.log("Transformed Data:", transformedData)

      // Call the onSearch function with the transformed data
      onSearch(transformedData)
    }, DEBOUNCE_DELAY)

    return [] // You might want to return something meaningful here
  } catch (error) {
    console.error("Error searching for anime:", error)
    throw error
  }
}
