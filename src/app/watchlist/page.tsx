"use client"

import MaxWidthWrapper from "@/src/components/MaxWidthWrapper"
import SearchBar from "@/src/components/SearchBar"
import React, { useEffect, useState } from "react"

interface Watchlist {
  title: string
  imageUrl: string
  episodes: number
  currentEpisode: number
  mal_id: number
  url: string
}

const Page = () => {
  const [animeList, setAnimeList] = useState([])
  const [watchlists, setWatchlists] = useState<Watchlist[]>([])
  const [search, setSearch] = useState("")
  const [episodeNumbers, setEpisodeNumbers] = useState<{
    [mal_id: number]: string
  }>({})

  const handleEpisodeChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    mal_id: number
  ) => {
    const newEpisodeNumber = event.target.value
    setEpisodeNumbers((prevState) => ({
      ...prevState,
      [mal_id]: newEpisodeNumber,
    }))

    // Update the local state with the new current episode number
    setWatchlists((prevWatchlists) =>
      prevWatchlists.map((watchlist) =>
        watchlist.mal_id === mal_id
          ? { ...watchlist, currentEpisode: parseInt(newEpisodeNumber) }
          : watchlist
      )
    )

    try {
      const response = await fetch(`/watchlists/${mal_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentEpisode: newEpisodeNumber }),
      })

      if (!response.ok) {
        throw new Error("Failed to update episode number in the database")
      }

      const updatedWatchlistItem = await response.json()
      console.log("Updated watchlist item:", updatedWatchlistItem)
    } catch (error) {
      console.error("Error updating episode number:", error)
    }
  }

  useEffect(() => {
    fetchWatchlists()
    const interval = setInterval(fetchWatchlists, 1000)
    return () => clearInterval(interval)
  }, [])

  const fetchWatchlists = async () => {
    try {
      const response = await fetch("/watchlists")
      const data: Watchlist[] = await response.json()
      setWatchlists(data)

      const initialEpisodeNumbers = data.reduce((acc, watchlist) => {
        return {
          ...acc,
          [watchlist.mal_id]: watchlist.currentEpisode.toString(),
        }
      }, {})
      setEpisodeNumbers(initialEpisodeNumbers)
    } catch (error) {
      console.error("Fetch error:", error)
    }
  }

  const handleSearch = (query: string) => {
    setSearch(query)
    fetchAnime(query)
  }

  const fetchAnime = async (query: string) => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${query}&order_by=popularity&sort=asc&limit=10&sfw=true`
      )
      const temp = await response.json()
      setAnimeList(temp.data)
    } catch (error) {
      console.error("Fetch error:", error)
    }
  }

  const removeFromWatchlist = async (mal_id: number) => {
    try {
      const response = await fetch(`/watchlists/${mal_id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to remove item from watchlist")
      }

      // Filter out the removed item from the watchlists state
      setWatchlists((prevWatchlists) =>
        prevWatchlists.filter((watchlist) => watchlist.mal_id !== mal_id)
      )
    } catch (error) {
      console.error("Error removing item from watchlist:", error)
    }
  }

  return (
    <MaxWidthWrapper className="font-semibold">
      <SearchBar
        className=".WatchAnime text-white max-h-[200px] overflow-y-hidden overflow-x-hidden scrollbar"
        handleSearch={handleSearch}
        search={search}
        setSearch={setSearch}
        animeList={animeList}
      />
      <div className="text-white -ml-10 -mt-5 ">
        <h1 className="text-2xl font-bold -pt-10 -mt-2">Watchlists</h1>
        <div>
          <ul className="">
            {watchlists.map((watchlist) => (
              <div
                key={watchlist.mal_id}
                className="mt-6 text-sm leading-4 hover:bg-slate-600"
              >
                <li className="flex">
                  <a href={watchlist.url} target="_blank">
                    <img
                      className="mr-2 w-[144px] h-[144px]"
                      src={watchlist.imageUrl}
                      alt={watchlist.title}
                    />
                  </a>
                  <div className="leading-5">
                    <h1 className="font-bold text-lg -pt-2 pb-1">
                      {watchlist.title}
                    </h1>
                    <p>
                      Current Episode: {watchlist.currentEpisode}{" "}
                      <input
                        type="number"
                        value={episodeNumbers[watchlist.mal_id] || ""}
                        onChange={(e) =>
                          handleEpisodeChange(e, watchlist.mal_id)
                        }
                        placeholder="#"
                        className="border border-gray-300 rounded py-1 pl-1 w-9 text-sm h-5 text-center text-black"
                        key={watchlist.mal_id}
                      />
                    </p>{" "}
                    {/* Display current episode number */}
                    <p>Total Episodes: {watchlist.episodes} </p>
                    <p>
                      Percentage Watched:{" "}
                      {(
                        (watchlist.currentEpisode / watchlist.episodes) *
                        100
                      ).toFixed(0)}
                      %
                    </p>
                    <button
                      className="bg-slate-600 rounded-md p-1 text-black"
                      onClick={() => removeFromWatchlist(watchlist.mal_id)}
                    >
                      Remove from Watchlist
                    </button>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default Page
