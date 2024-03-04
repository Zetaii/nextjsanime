"use client"

import MaxWidthWrapper from "@/src/components/MaxWidthWrapper"
import SearchBar from "@/src/components/SearchBar"
import React, { useEffect, useState } from "react"

interface Watchlist {
  title: string
  imageUrl: string
  episodes: number
  currentEpisode: number
}

const page = () => {
  const [animeList, setAnimeList] = useState([])
  const [watchlists, setWatchlists] = useState<Watchlist[]>([])
  const [search, setSearch] = useState("")
  const [episodeNumber, setEpisodeNumber] = useState("") // State for episode number

  const handleEpisodeChange = (event: any, watchlist: any) => {
    const newEpisodeNumber = event.target.value
    // Update episode number in the state
    setEpisodeNumber(newEpisodeNumber)
    // Update episode number in the database
    updateEpisodeNumberInDatabase(watchlist, newEpisodeNumber)
  }

  const updateEpisodeNumberInDatabase = (
    watchlist: any,
    newEpisodeNumber: any
  ) => {
    // Perform database update here, for example:
    console.log(
      `Updating episode number for ${watchlist.title} to ${newEpisodeNumber}`
    )
  }

  useEffect(() => {
    // Fetch watchlists from MongoDB when the component mounts
    fetchWatchlists()
  }, [])

  const fetchWatchlists = async () => {
    try {
      // Fetch watchlists data from your backend server
      const response = await fetch("/watchlists")
      const data: Watchlist[] = await response.json()
      setWatchlists(data)
    } catch (error) {
      console.error("Fetch error:", error)
    }
  }

  const HandleSearch = (e: any) => {
    e.preventDefault()

    FetchAnime(search)
  }

  const FetchAnime = async (query: any) => {
    try {
      const temp = await fetch(
        `https://api.jikan.moe/v4/anime?q=${query}&order_by=popularity&sort=asc&limit=10&sfw=true`
      ).then((res) => res.json())

      setAnimeList(temp.data)
    } catch (error) {
      console.error("Fetch error:", error)
    }
  }

  return (
    <MaxWidthWrapper>
      <SearchBar
        className=".WatchAnime text-white max-h-[200px] overflow-y-hidden overflow-x-hidden scrollbar"
        HandleSearch={HandleSearch}
        search={search}
        setSearch={setSearch}
        animeList={animeList}
      />
      <div className="text-white ">
        <h1 className="text-2xl bold">Watchlists</h1>
        <div>
          <ul>
            {watchlists.map((watchlist) => (
              <div className="">
                <li key={watchlist.title} className="flex">
                  <img className="mr-2 w-24 h-24" src={watchlist.imageUrl} />
                  <div>
                    {watchlist.title}
                    <p>
                      Episode {watchlist.currentEpisode}{" "}
                      <input
                        type="number"
                        value={episodeNumber}
                        onChange={(e) => handleEpisodeChange(e, watchlist)}
                        placeholder="#"
                        className="border border-gray-300 rounded py-1  text-black"
                      />
                    </p>{" "}
                    {/* Display current episode number */}
                    <p>Total Episodes: {watchlist.episodes} </p>
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

export default page
