// pages/api/watchlist.ts

import { NextApiRequest, NextApiResponse } from "next"
import WatchlistModel from "../../models/WatchlistItem"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const watchlistItems = await WatchlistModel.find()
    res.status(200).json({ watchlistItems })
  } catch (error) {
    console.error("Error fetching watchlist items:", error)
    res.status(500).json({ error: "Error fetching watchlist items" })
  }
}
