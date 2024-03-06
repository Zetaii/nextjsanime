import React from "react"
import WatchAnime from "./WatchAnime"
import { useState } from "react"

const SearchBar = (props: any) => {
  const [watchlists, setWatchlists] = useState<any>([])
  const [watching, setWatching] = useState<any>([])
  const [finished, setFinished] = useState<any>([])

  const [isWatchAnimeVisible, setIsWatchAnimeVisible] = React.useState(true)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    props.handleSearch(props.search)
  }

  const hideWatchAnime = () => {
    setIsWatchAnimeVisible(false)
  }

  const showWatchAnime = () => {
    setIsWatchAnimeVisible(true)
  }

  const handleAddToWatchlist = (addedAnime: any) => {
    setWatchlists((prevWatchlists: any) => [...prevWatchlists, addedAnime])
  }

  const handleAddToWatching = (addedAnime: any) => {
    setWatchlists((prevWatching: any) => [...prevWatching, addedAnime])
  }

  const handleAddToFinished = (addedAnime: any) => {
    setWatchlists((prevFinished: any) => [...prevFinished, addedAnime])
  }

  return (
    <>
      <div className="flex">
        <div className="ml-auto ">
          <form onSubmit={handleSubmit} className="pt-3">
            <input
              className=" mt-5 mb-5 pl-2 rounded-md bg-slate-500 text-white border-2 b border-white w-50 h-10 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              placeholder="Search for an anime... "
              required
              value={props.search}
              onChange={(e) => props.setSearch(e.target.value)}
              onFocus={showWatchAnime} // Show WatchAnime when input is focused
            />
          </form>
        </div>
      </div>

      <div className="rounded:lg text-white fixed right-20 overflow-y-auto max-h-[400px] overflow-x-hidden mr-60 WatchAnime scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300">
        {isWatchAnimeVisible &&
          props.animeList.map((anime: any, index: number) => (
            <div
              key={anime.title}
              className="w-[300px] bg-[#141824] rounded-md hover:bg-slate-400 flex mr-0"
            >
              <WatchAnime
                anime={anime}
                onHide={hideWatchAnime}
                handleAddToWatchlist={handleAddToWatchlist}
                handleAddToFinished={handleAddToFinished}
                handleAddToWatching={handleAddToWatching}
              />
            </div>
          ))}
      </div>
    </>
  )
}

export default SearchBar
