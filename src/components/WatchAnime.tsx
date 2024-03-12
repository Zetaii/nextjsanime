import React, { useRef, useState } from "react"
import Image from "next/image"
import { useOnClickOutside } from "../hooks/use-on-click-outside"

interface WatchAnimeProps {
  anime: any
  onHide: () => void
  handleAddToWatchlist: (anime: any) => void
  handleAddToWatching: (anime: any) => void
  handleAddToFinished: (anime: any) => void
  updateWatchlist: () => void
  updateWatching: () => void
  updateFinished: () => void
}

const WatchAnime: React.FC<WatchAnimeProps> = ({
  anime,
  onHide,
  handleAddToWatchlist,
  handleAddToWatching,
  handleAddToFinished,
  updateWatchlist,
  updateWatching,
  updateFinished,
}) => {
  const animeRef = useRef<HTMLDivElement | null>(null)
  const [isAddedWatchlist, setIsAddedWatchlist] = useState(false)
  const [isAddedWatching, setIsAddedWatching] = useState(false)
  const [isAddedFinished, setIsAddedFinished] = useState(false)

  // Function to determine if an element should be ignored
  const shouldIgnore = (target: HTMLElement): boolean => {
    // Ignore clicks on elements with the class name .WatchAnime
    if (target.closest(".WatchAnime")) {
      return false
    }

    return true
  }

  const addToWatchlist = async () => {
    try {
      const response = await fetch("/add-to-watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: anime.title,
          imageUrl: anime.images.jpg.large_image_url,
          episodes: anime.episodes,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add anime to watching")
      }

      const isAddedWatchlist = await response.json()
      console.log("Response:", isAddedWatching)
      setIsAddedWatchlist(true)

      handleAddToWatchlist(isAddedWatchlist)
      updateWatchlist()
    } catch (error) {
      console.error("Error adding anime to watching:", error)
    }
  }

  const addToWatching = async () => {
    try {
      const response = await fetch("/add-to-watching", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: anime.title,
          imageUrl: anime.images.jpg.large_image_url,
          episodes: anime.episodes,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add anime to watching")
      }

      const isAddedWatching = await response.json()
      console.log("Response:", isAddedWatching)
      setIsAddedWatching(true)

      handleAddToWatching(isAddedWatching)
      updateWatching()
    } catch (error) {
      console.error("Error adding anime to watching:", error)
    }
  }

  const addToFinished = async () => {
    try {
      const response = await fetch("/add-to-finished", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: anime.title,
          imageUrl: anime.images.jpg.large_image_url,
          episodes: anime.episodes,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add anime to finished")
      }

      const isAddedFinished = await response.json()
      console.log("Response:", isAddedFinished)
      setIsAddedFinished(true)

      handleAddToFinished(isAddedFinished)
      updateFinished()
    } catch (error) {
      console.error("Error adding anime to watchlist:", error)
    }
  }

  // Pass shouldIgnore function to useOnClickOutside hook
  useOnClickOutside(animeRef, onHide, shouldIgnore)

  return (
    <div className="WatchAnime  flex  text-white rounded">
      <div ref={animeRef} className="flex gap-2 m-2">
        <div className="relative w-[120px] h-[144px]">
          <a href={anime.url} className="text-white">
            <Image
              className="rounded-md"
              src={anime.images.jpg.large_image_url}
              alt="Anime image"
              fill
            />
          </a>
        </div>
        <div className="flex flex-col justify-center">
          <a href={anime.url} className="text-white">
            <h3 className="">{anime.title}</h3>
          </a>
          <button
            className={`bg-slate-500 hover:bg-blue-300 rounded-md p-2 m-1 text-xs ${
              isAddedWatching ? "bg-gray-400 cursor-not-allowed" : "" // Disable button and change color if added
            }`}
            onClick={addToWatching}
            disabled={isAddedWatching} // Disable the button if anime is added
          >
            {isAddedWatching ? "Added" : "Currently Watching"}{" "}
            {/* Change button text based on state */}
          </button>
          <button
            className={`bg-slate-500 hover:bg-blue-300 rounded-md p-2 m-1 text-xs ${
              isAddedWatchlist ? "bg-gray-400 cursor-not-allowed" : "" // Disable button and change color if added
            }`}
            onClick={addToWatchlist}
            disabled={isAddedWatchlist} // Disable the button if anime is added
          >
            {isAddedWatchlist ? "Added" : "Add To Watchlist"}{" "}
          </button>
          <button
            className={`bg-slate-500 hover:bg-blue-300 rounded-md p-2 m-1 text-xs ${
              isAddedFinished ? "bg-gray-400 cursor-not-allowed" : "" // Disable button and change color if added
            }`}
            onClick={addToFinished}
            disabled={isAddedFinished} // Disable the button if anime is added
          >
            {isAddedFinished ? "Added" : "Add To Finished"}{" "}
            {/* Change button text based on state */}
          </button>
        </div>
      </div>
    </div>
  )
}

export default WatchAnime
