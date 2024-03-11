"use client"

import MaxWidthWrapper from "@/src/components/MaxWidthWrapper"
import SearchBar from "@/src/components/SearchBar"
import React, { useEffect, useState } from "react"
import "./Styles.css"

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
  const [isLoading, setIsLoading] = useState(false)

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

  const handleEpisodeChangeWatching = async (
    event: React.ChangeEvent<HTMLInputElement>,
    mal_id: number
  ) => {
    const newEpisodeNumber = event.target.value
    setEpisodeNumbers((prevState) => ({
      ...prevState,
      [mal_id]: newEpisodeNumber,
    }))

    // Update the local state with the new current episode number
    setWatching((prevWatching) =>
      prevWatching.map((watching) =>
        watching.mal_id === mal_id
          ? { ...watching, currentEpisode: parseInt(newEpisodeNumber) }
          : watching
      )
    )

    try {
      const response = await fetch(`/watching/${mal_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentEpisode: newEpisodeNumber }),
      })

      if (!response.ok) {
        throw new Error("Failed to update episode number in the database")
      }

      const updatedWatchingItem = await response.json()
      console.log("Updated watchlist item:", updatedWatchingItem)
    } catch (error) {
      console.error("Error updating episode number:", error)
    }
  }

  const handleEpisodeChangeFinished = async (
    event: React.ChangeEvent<HTMLInputElement>,
    mal_id: number
  ) => {
    const newEpisodeNumber = event.target.value
    setEpisodeNumbers((prevState) => ({
      ...prevState,
      [mal_id]: newEpisodeNumber,
    }))

    // Update the local state with the new current episode number
    setFinished((prevFinished) =>
      prevFinished.map((finished) =>
        finished.mal_id === mal_id
          ? { ...finished, currentEpisode: parseInt(newEpisodeNumber) }
          : finished
      )
    )

    try {
      const response = await fetch(`/finished/${mal_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentEpisode: newEpisodeNumber }),
      })

      if (!response.ok) {
        throw new Error("Failed to update episode number in the database")
      }

      const updatedfinishedItem = await response.json()
      console.log("Updated watchlist item:", updatedfinishedItem)
    } catch (error) {
      console.error("Error updating episode number:", error)
    }
  }

  useEffect(() => {
    fetchWatchlists()
    // const watchlistsInterval = setInterval(fetchWatchlists, 1000)
    // return () => clearInterval(watchlistsInterval)
  }, [])

  useEffect(() => {
    fetchWatching()
    // const watchingInterval = setInterval(fetchWatching, 1000)
    // return () => clearInterval(watchingInterval)
  }, [])

  useEffect(() => {
    fetchFinished()
    // const finishedInterval = setInterval(fetchFinished, 1000)
    // return () => clearInterval(finishedInterval)
  }, [])

  const fetchWatchlists = async () => {
    setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

  const fetchWatching = async () => {
    setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

  const fetchFinished = async () => {
    setIsLoading(true)
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
    } finally {
      setIsLoading(false)
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

  const addToWatchlist = async (
    anime: Watchlist | Watching | Finished,
    section: string
  ) => {
    try {
      let removeFromSectionEndpoint = ""
      switch (section) {
        case "watching":
          removeFromSectionEndpoint = `/watching/${anime.mal_id}`
          break
        case "finished":
          removeFromSectionEndpoint = `/finished/${anime.mal_id}`
          break
        default:
          console.error("Invalid section")
          return
      }
      // Remove the anime from the corresponding section
      const removeResponse = await fetch(removeFromSectionEndpoint, {
        method: "DELETE",
      })

      if (!removeResponse.ok) {
        throw new Error(`Failed to remove item from ${section}`)
      }

      // Add the anime to the watchlist
      const response = await fetch("/add-to-watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(anime),
      })

      if (!response.ok) {
        throw new Error("Failed to add item to watchlist")
      }

      const addedItem = await response.json()
      console.log("Added item to watchlist:", addedItem)
      await fetchWatchlists
      // Update the local state with the added item
      setWatchlists((prevWatchlists) => [...prevWatchlists, addedItem])
    } catch (error) {
      console.error("Error adding item to watchlist:", error)
    }
  }

  const addToWatching = async (
    anime: Watchlist | Watching | Finished,
    section: string
  ) => {
    try {
      let removeFromSectionEndpoint = ""
      switch (section) {
        case "watchlist":
          removeFromSectionEndpoint = `/watchlists/${anime.mal_id}`
          break
        case "finished":
          removeFromSectionEndpoint = `/finished/${anime.mal_id}`
          break
        default:
          console.error("Invalid section")
          return
      }
      // Remove the anime from the corresponding section
      const removeResponse = await fetch(removeFromSectionEndpoint, {
        method: "DELETE",
      })

      if (!removeResponse.ok) {
        throw new Error(`Failed to remove item from ${section}`)
      }

      // Add the anime to the watchlist
      const response = await fetch("/add-to-watching", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(anime),
      })

      if (!response.ok) {
        throw new Error("Failed to add item to watchlist")
      }

      const addedItem = await response.json()
      console.log("Added item to watchlist:", addedItem)

      // Update the local state with the added item
      setWatchlists((prevWatchlists) => [...prevWatchlists, addedItem])
    } catch (error) {
      console.error("Error adding item to watchlist:", error)
    }
  }

  const addToFinished = async (
    anime: Watchlist | Watching | Finished,
    section: string
  ) => {
    try {
      let removeFromSectionEndpoint = ""
      switch (section) {
        case "watching":
          removeFromSectionEndpoint = `/watching/${anime.mal_id}`
          break
        case "watchlist":
          removeFromSectionEndpoint = `/watchlists/${anime.mal_id}`
          break
        default:
          console.error("Invalid section")
          return
      }
      // Remove the anime from the corresponding section
      const removeResponse = await fetch(removeFromSectionEndpoint, {
        method: "DELETE",
      })

      if (!removeResponse.ok) {
        throw new Error(`Failed to remove item from ${section}`)
      }

      // Add the anime to the watchlist
      const response = await fetch("/add-to-finished", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(anime),
      })

      if (!response.ok) {
        throw new Error("Failed to add item to watchlist")
      }

      const addedItem = await response.json()
      console.log("Added item to watchlist:", addedItem)

      // Update the local state with the added item
      setWatchlists((prevWatchlists) => [...prevWatchlists, addedItem])
    } catch (error) {
      console.error("Error adding item to watchlist:", error)
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

  let watchingPercentage = watching.map((watching) => {
    return (watching.currentEpisode / watching.episodes) * 100
  })

  return (
    <MaxWidthWrapper className="wrapper font-semibold border-2 min-h-[90vh] rounded-md animate-my-glow-combined">
      <SearchBar
        className="WatchAnime text-white max-h-[200px] overflow-y-hidden overflow-x-hidden scrollbar"
        handleSearch={handleSearch}
        search={search}
        setSearch={setSearch}
        animeList={animeList}
      />

      <>
        <div className="text-white -ml-10 mt-20 min-h-52 ">
          <h1 className="text-2xl font-bold -pt-10 -mt-2 border-b-2 title">
            Currently Watching
          </h1>
          {watching.length === 0 && <p> Nothing here yet </p>}
          <div>
            <ul className="cards">
              {watching.map((watching) => (
                <div
                  key={watching.mal_id}
                  className="mt-6 text-sm leading-4 hover:bg-slate-600"
                >
                  <li className="flex">
                    <a href={watching.url} target="_blank">
                      <img
                        className="mr-4 w-[144px] h-[144px] rounded-md animate-fade-in"
                        src={watching.imageUrl}
                        alt={watching.title}
                      />
                    </a>
                    <div className="leading-5">
                      <h1 className="font-bold text-lg -pt-2 pb-1">
                        {watching.title}
                      </h1>
                      <p className="">
                        Current Episode: {watching.currentEpisode}{" "}
                        <input
                          type="number"
                          onChange={(e) =>
                            handleEpisodeChangeWatching(e, watching.mal_id)
                          }
                          placeholder="#"
                          className="border border-gray-300 rounded py-1 pl-1 w-12 text-sm h-5 text-center text-black"
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
                      <div>
                        <div className="bg-purple-500/20 h-4 rounded-full overflow-hidden">
                          <div
                            className="bg-purple-500 flex justify-center items-center"
                            style={{
                              width: `${Math.round(
                                (watching.currentEpisode / watching.episodes) *
                                  100
                              )}%`,
                            }}
                          >
                            <div className="pl-8">
                              {(
                                (watching.currentEpisode / watching.episodes) *
                                100
                              ).toFixed(0)}
                              %
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className="bg-red-500 rounded-md p-1 text-black hover:bg-slate-800 hover:text-white mt-2 mr-2 glow-on-hover"
                        onClick={() => removeFromWatching(watching.mal_id)}
                      >
                        Remove from Watching
                      </button>
                      <button
                        className="bg-yellow-600  rounded-md p-1 text-black hover:bg-slate-800 hover:text-white mt-2 mr-2 glow-on-hover"
                        onClick={() => addToWatchlist(watching, "watching")}
                      >
                        Add to Watchlist
                      </button>
                      <button
                        className="bg-emerald-700 rounded-md p-1 text-black hover:bg-slate-800 hover:text-white mt-2 glow-on-hover  "
                        onClick={() => addToFinished(watching, "watching")}
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
        <div className="text-white -ml-10 mt-5 mb-5 min-h-52">
          <h1 className="font-bold text-2xl -pt-2 pb-1 border-b-2 title ">
            Want to Watch
          </h1>
          {watchlists.length === 0 && <p>Nothing here yet</p>}
          <div>
            <ul className="cards">
              {watchlists.map((watchlist) => (
                <div
                  key={watchlist.mal_id}
                  className="mt-6 text-sm leading-4 hover:bg-slate-600"
                >
                  <li className="flex">
                    <a href={watchlist.url} target="_blank">
                      <img
                        className="mr-4 w-[144px] h-[144px] rounded-md  animate-fade-in"
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
                          className="border border-gray-300 rounded py-1 pl-1 w-12 text-sm h-5 text-center text-black"
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
                      <div>
                        <div className="bg-purple-500/20 h-4 rounded-full overflow-hidden">
                          <div
                            className="bg-purple-500 flex justify-center items-center"
                            style={{
                              width: `${Math.round(
                                (watchlist.currentEpisode /
                                  watchlist.episodes) *
                                  100
                              )}%`,
                            }}
                          >
                            <div className="pl-8">
                              {(
                                (watchlist.currentEpisode /
                                  watchlist.episodes) *
                                100
                              ).toFixed(0)}
                              %
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className="bg-red-500 rounded-md p-1 text-black hover:bg-slate-800 hover:text-white mt-2 mr-2 glow-on-hover"
                        onClick={() => removeFromWatchlist(watchlist.mal_id)}
                      >
                        Remove from Watchlist
                      </button>
                      <button
                        className="bg-blue-400 rounded-md p-1 text-black hover:bg-slate-800 hover:text-white mt-2 mr-2 glow-on-hover"
                        onClick={() => addToWatching(watchlist, "watchlist")}
                      >
                        Add to Watching
                      </button>
                      <button
                        className="bg-emerald-700 rounded-md p-1 text-black hover:bg-slate-800 hover:text-white mt-2 glow-on-hover"
                        onClick={() => addToFinished(watchlist, "watchlist")}
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
        <div className="text-white -ml-10 mb-5 pb-20 min-h-52">
          <h1 className="font-bold text-2xl -pt-2  border-b-2 title">
            Finished
          </h1>
          {finished.length === 0 && <p>Nothing here yet</p>}
          <div>
            <ul className="cards">
              {finished.map((finished) => (
                <div
                  key={finished.mal_id}
                  className="mt-6 text-sm leading-4 hover:bg-slate-600"
                >
                  <li className="flex">
                    <a href={finished.url} target="_blank">
                      <img
                        className="mr-4 w-[144px] h-[144px] rounded-md animate-fade-in "
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
                            handleEpisodeChangeFinished(e, finished.mal_id)
                          }
                          placeholder="#"
                          className="border border-gray-300 rounded py-1 pl-1 w-12 text-sm h-5 text-center text-black"
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
                      <div>
                        <div className="bg-purple-500/20 h-4 rounded-full overflow-hidden">
                          <div
                            className="bg-purple-500 flex justify-center items-center"
                            style={{
                              width: `${Math.round(
                                (finished.currentEpisode / finished.episodes) *
                                  100
                              )}%`,
                            }}
                          >
                            <div className="pl-8">
                              {(
                                (finished.currentEpisode / finished.episodes) *
                                100
                              ).toFixed(0)}
                              %
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className="bg-red-500 rounded-md p-1 text-black hover:bg-slate-800 hover:text-white mt-2 mr-2 glow-on-hover"
                        onClick={() => removeFromFinished(finished.mal_id)}
                      >
                        Remove from Finished
                      </button>
                      <button
                        className="bg-blue-400 rounded-md p-1 text-black hover:bg-slate-800 hover:text-white mt-2 mr-2 glow-on-hover"
                        onClick={() => addToWatching(finished, "finished")}
                      >
                        Add to Watching
                      </button>
                      <button
                        className="bg-yellow-600 rounded-md p-1 text-black hover:bg-slate-800 hover:text-white mt-2 glow-on-hover"
                        onClick={() => addToWatchlist(finished, "finished")}
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
      </>
    </MaxWidthWrapper>
  )
}

export default Page
