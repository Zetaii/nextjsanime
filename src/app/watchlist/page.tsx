"use client"

import MaxWidthWrapper from "@/src/components/MaxWidthWrapper"
import SearchBar from "@/src/components/SearchBar"
import React, { useEffect, useState } from "react"

const page = () => {
  const [animeList, setAnimeList] = useState([])
  const [topAnime, setTopAnime] = useState([])
  const [search, setSearch] = useState("")

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
        HandleSearch={HandleSearch}
        search={search}
        setSearch={setSearch}
        animeList={animeList}
      />
    </MaxWidthWrapper>
  )
}

export default page
