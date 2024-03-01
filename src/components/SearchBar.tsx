import React from "react"
import WatchAnime from "./WatchAnime"
import { useState } from "react"

const SearchBar = (props: any) => {
  const [animeList, setAnimeList] = useState([])
  const [watchlist, setWatchlist] = useState([])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    props.HandleSearch(e)
  }

  // State variable to control the visibility of WatchAnime component
  const [isWatchAnimeVisible, setIsWatchAnimeVisible] = React.useState(true)

  const hideWatchAnime = () => {
    setIsWatchAnimeVisible(false)
  }

  const showWatchAnime = () => {
    setIsWatchAnimeVisible(true)
  }

  return (
    <>
      <div className="flex">
        <div className="ml-auto">
          <form onSubmit={handleSubmit}>
            <input
              className="pl-2 rounded-md bg-slate-500 text-white"
              placeholder="Search for an anime... "
              required
              value={props.search}
              onChange={(e) => props.setSearch(e.target.value)}
              onFocus={showWatchAnime} // Show WatchAnime when input is focused
            />
          </form>
        </div>
      </div>

      <div className="text-white">
        {isWatchAnimeVisible &&
          props.animeList.map((anime: any, index: number) => (
            <div
              key={anime.title}
              className="w-[400px] bg-black rounded-md hover:bg-slate-400 flex ml-auto -mr-20"
            >
              <WatchAnime anime={anime} onHide={hideWatchAnime} />
            </div>
          ))}
      </div>
    </>
  )
}

export default SearchBar
