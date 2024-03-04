import React, { useRef } from "react"
import Image from "next/image"
import { useOnClickOutside } from "../app/hooks/use-on-click-outside"

interface WatchAnimeProps {
  anime: any
  onHide: () => void // Callback function to hide the component
}

const WatchAnime: React.FC<WatchAnimeProps> = ({ anime, onHide }) => {
  const animeRef = useRef<HTMLDivElement | null>(null)

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
        throw new Error("Failed to add anime to watchlist")
      }

      const data = await response.json()
      console.log("Response:", data)
      // Handle success
    } catch (error) {
      console.error("Error adding anime to watchlist:", error)
      // Handle error
    }
  }

  // Pass shouldIgnore function to useOnClickOutside hook
  useOnClickOutside(animeRef, onHide, shouldIgnore)

  return (
    <div className="WatchAnime flex text-white rounded">
      <div ref={animeRef} className="flex gap-2 m-2">
        <div className="relative w-[120px] h-[144px]">
          <Image
            src={anime.images.jpg.large_image_url}
            alt="Anime image"
            fill
          />
        </div>
        <div className="flex flex-col justify-center">
          <a href={anime.url} className="text-white">
            <h3 className="">{anime.title}</h3>
          </a>
          <button
            className="bg-slate-500 hover:bg-blue-300 rounded-md p-2 m-1 text-xs"
            onClick={addToWatchlist} // Call the addToWatchlist function when the button is clicked
          >
            Add To Watchlist
          </button>
        </div>
      </div>
    </div>
  )
}

export default WatchAnime
