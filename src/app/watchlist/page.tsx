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

interface Watching {
  title: string
  imageUrl: string
  episodes: number
  currentEpisode: number
  mal_id: number
  url: string
}

interface Finished {
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
  const [watching, setWatching] = useState<Watching[]>([])
  const [finished, setFinished] = useState<Finished[]>([])
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
    const watchlistsInterval = setInterval(fetchWatchlists, 500)
    return () => clearInterval(watchlistsInterval)
  }, [])

  useEffect(() => {
    fetchWatching()
    const watchingInterval = setInterval(fetchWatching, 500)
    return () => clearInterval(watchingInterval)
  }, [])

  useEffect(() => {
    fetchFinished()
    const finishedInterval = setInterval(fetchFinished, 500)
    return () => clearInterval(finishedInterval)
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

  const fetchWatching = async () => {
    try {
      const response = await fetch("/watching")
      const data: Watching[] = await response.json()
      setWatching(data)
      const initialEpisodeNumbers = data.reduce((acc, watching) => {
        return {
          ...acc,
          [watching.mal_id]: watching.currentEpisode.toString(),
        }
      }, {})
      setEpisodeNumbers(initialEpisodeNumbers)
    } catch (error) {
      console.error("Fetch error:", error)
    }
  }

  const fetchFinished = async () => {
    try {
      const response = await fetch("/finished")
      const data: Finished[] = await response.json()
      setFinished(data)

      const initialEpisodeNumbers = data.reduce((acc, finished) => {
        return {
          ...acc,
          [finished.mal_id]: finished.currentEpisode.toString(),
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

  const removeFromWatching = async (mal_id: number) => {
    try {
      const response = await fetch(`/watching/${mal_id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to remove item from watching")
      }

      // Filter out the removed item from the watchlists state
      setWatching((prevWatching) =>
        prevWatching.filter((watching) => watching.mal_id !== mal_id)
      )
    } catch (error) {
      console.error("Error removing item from watching:", error)
    }
  }

  const removeFromFinished = async (mal_id: number) => {
    try {
      const response = await fetch(`/finished/${mal_id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to remove item from finished")
      }

      // Filter out the removed item from the watchlists state
      setFinished((prevFinished) =>
        prevFinished.filter((finished) => finished.mal_id !== mal_id)
      )
    } catch (error) {
      console.error("Error removing item from finished:", error)
    }
  }

  return (
    <MaxWidthWrapper className="font-semibold border-2 shadow-custom-glow">
      <SearchBar
        className=".WatchAnime text-white max-h-[200px] overflow-y-hidden overflow-x-hidden scrollbar"
        handleSearch={handleSearch}
        search={search}
        setSearch={setSearch}
        animeList={animeList}
      />
      <div className="text-white -ml-10 -mt-5 ">
        <h1 className="text-2xl font-bold -pt-10 -mt-2 border-b-2">
          Currently Watching
        </h1>
        <div>
          <ul className="">
            {watching.map((watching) => (
              <div
                key={watching.mal_id}
                className="mt-6 text-sm leading-4 hover:bg-slate-600"
              >
                <li className="flex">
                  <a href={watching.url} target="_blank">
                    <img
                      className="mr-4 w-[144px] h-[144px] rounded-md "
                      src={watching.imageUrl}
                      alt={watching.title}
                    />
                  </a>
                  <div className="leading-5">
                    <h1 className="font-bold text-lg -pt-2 pb-1">
                      {watching.title}
                    </h1>
                    <p>
                      Current Episode: {watching.currentEpisode}{" "}
                      <input
                        type="number"
                        value={episodeNumbers[watching.mal_id] || ""}
                        onChange={(e) =>
                          handleEpisodeChange(e, watching.mal_id)
                        }
                        placeholder="#"
                        className="border border-gray-300 rounded py-1 pl-1 w-9 text-sm h-5 text-center text-black"
                        key={watching.mal_id}
                      />
                    </p>{" "}
                    {/* Display current episode number */}
                    <p>Total Episodes: {watching.episodes} </p>
                    <p>
                      Percentage Watched:{" "}
                      {(
                        (watching.currentEpisode / watching.episodes) *
                        100
                      ).toFixed(0)}
                      %
                    </p>
                    <button
                      className="bg-slate-100 rounded-md p-1 text-black hover:bg-slate-800 hover:text-white mt-2 mr-2"
                      onClick={() => removeFromWatching(watching.mal_id)}
                    >
                      Remove from Watching
                    </button>
                    <button
                      className="bg-slate-100 rounded-md p-1 text-black hover:bg-slate-800 hover:text-white mt-2 mr-2"
                      onClick={() => removeFromWatchlist(watching.mal_id)}
                    >
                      Add to Watchlist
                    </button>
                    <button
                      className="bg-slate-100 rounded-md p-1 text-black hover:bg-slate-800 hover:text-white mt-2"
                      onClick={() => removeFromWatchlist(watching.mal_id)}
                    >
                      Add to Finished
                    </button>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-white -ml-10 mt-5 mb-5 ">
        <h1 className="font-bold text-2xl -pt-2 pb-1 border-b-2">
          Want to Watch
        </h1>
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
                      className="mr-4 w-[144px] h-[144px] rounded-md "
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
                      className="bg-slate-100 rounded-md p-1 text-black hover:bg-slate-800 hover:text-white mt-2 mr-2"
                      onClick={() => removeFromWatchlist(watchlist.mal_id)}
                    >
                      Remove from Watchlist
                    </button>
                    <button
                      className="bg-slate-100 rounded-md p-1 text-black hover:bg-slate-800 hover:text-white mt-2 mr-2"
                      onClick={() => removeFromWatchlist(watchlist.mal_id)}
                    >
                      Add to Watchlist
                    </button>
                    <button
                      className="bg-slate-100 rounded-md p-1 text-black hover:bg-slate-800 hover:text-white mt-2"
                      onClick={() => removeFromWatchlist(watchlist.mal_id)}
                    >
                      Add to Finished
                    </button>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-white -ml-10 mb-5 pb-20 ">
        <h1 className="font-bold text-2xl -pt-2  border-b-2">Finished</h1>
        <div>
          <ul className="">
            {finished.map((finished) => (
              <div
                key={finished.mal_id}
                className="mt-6 text-sm leading-4 hover:bg-slate-600"
              >
                <li className="flex">
                  <a href={finished.url} target="_blank">
                    <img
                      className="mr-4 w-[144px] h-[144px] rounded-md "
                      src={finished.imageUrl}
                      alt={finished.title}
                    />
                  </a>
                  <div className="leading-5">
                    <h1 className="font-bold text-lg -pt-2 pb-1">
                      {finished.title}
                    </h1>
                    <p>
                      Current Episode: {finished.currentEpisode}{" "}
                      <input
                        type="number"
                        value={episodeNumbers[finished.mal_id] || ""}
                        onChange={(e) =>
                          handleEpisodeChange(e, finished.mal_id)
                        }
                        placeholder="#"
                        className="border border-gray-300 rounded py-1 pl-1 w-9 text-sm h-5 text-center text-black"
                        key={finished.mal_id}
                      />
                    </p>{" "}
                    {/* Display current episode number */}
                    <p>Total Episodes: {finished.episodes} </p>
                    <p>
                      Percentage Watched:{" "}
                      {(
                        (finished.currentEpisode / finished.episodes) *
                        100
                      ).toFixed(0)}
                      %
                    </p>
                    <button
                      className="bg-slate-100 rounded-md p-1 text-black hover:bg-slate-800 hover:text-white mt-2 mr-2"
                      onClick={() => removeFromFinished(finished.mal_id)}
                    >
                      Remove from Finished
                    </button>
                    <button
                      className="bg-slate-100 rounded-md p-1 text-black hover:bg-slate-800 hover:text-white mt-2 mr-2"
                      onClick={() => removeFromFinished(finished.mal_id)}
                    >
                      Add to Watching
                    </button>
                    <button
                      className="bg-slate-100 rounded-md p-1 text-black hover:bg-slate-800 hover:text-white mt-2"
                      onClick={() => removeFromFinished(finished.mal_id)}
                    >
                      Add to Watchlist
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
