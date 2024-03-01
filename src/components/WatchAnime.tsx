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
    // Ignore clicks outside the WatchAnime component
    return !target.closest(".WatchAnime")
  }

  // Pass shouldIgnore function to useOnClickOutside hook
  useOnClickOutside(animeRef, onHide, shouldIgnore)

  // Function to add anime title to the watchlist
  const addToWatchlist = () => {
    const animeList = document.createElement("h1")
    animeList.classList.add("text-white")
    animeList.textContent = anime.title

    document.body.appendChild(animeList)
  }

  return (
    <div ref={animeRef} className="WatchAnime flex text-white ">
      <div className="ml-auto">
        <a href={anime.url} className="flex gap-2 m-2">
          <div className="relative w-[144px] h-[144px]">
            <Image
              src={anime.images.jpg.large_image_url}
              alt="Anime image"
              fill
            />
          </div>
          <h3 className="w-[250px]">{anime.title}</h3>
        </a>
        <button
          className="bg-red-300 hover:bg-blue-300"
          onClick={addToWatchlist} // Call the addToWatchlist function when the button is clicked
        >
          Add To Watchlist
        </button>
      </div>
    </div>
  )
}

export default WatchAnime
