import express, { Request, Response } from "express"
import WatchlistModel from "./models/WatchlistItem"

const watchlistRouter = express.Router()

// Endpoint to add an anime to the user's watchlist
watchlistRouter.post("/add", async (req: Request, res: Response) => {
  try {
    const { userId, animeId, title, imageUrl } = req.body

    // Check if all required fields are provided
    if (!userId || !animeId || !title || !imageUrl) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Create a new watchlist item and save it to the database
    const newWatchlistItem = await WatchlistModel.create({
      userId,
      animeId,
      title,
      imageUrl,
    })

    res.status(201).json(newWatchlistItem)
  } catch (err) {
    console.error("Error adding anime to watchlist:", err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

// Endpoint to remove an anime from the user's watchlist
watchlistRouter.post("/remove", async (req: Request, res: Response) => {
  try {
    const { watchlistItemId } = req.body

    // Check if watchlistItemId is provided
    if (!watchlistItemId) {
      return res.status(400).json({ error: "watchlistItemId is required" })
    }

    // Remove the watchlist item from the database
    await WatchlistModel.findByIdAndDelete(watchlistItemId)

    res.status(200).json({ message: "Watchlist item removed successfully" })
  } catch (err) {
    console.error("Error removing anime from watchlist:", err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

// Endpoint to retrieve the user's entire watchlist
watchlistRouter.get("/", async (req: Request, res: Response) => {
  try {
    // Retrieve all watchlist items from the database
    const watchlistItems = await WatchlistModel.find()

    res.status(200).json(watchlistItems)
  } catch (err) {
    console.error("Error retrieving user's watchlist:", err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

export default watchlistRouter
