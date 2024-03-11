import express from "express"
import { getPayloadClient } from "./get-payload"
import { nextApp, nextHandler } from "./next-utils"
import * as trpcExpress from "@trpc/server/adapters/express"
import { appRouter } from "./trpc"
import { inferAsyncReturnType } from "@trpc/server"
import bodyParser from "body-parser"
import { IncomingMessage } from "http"
// import { stripeWebhookHandler } from "./webhooks"
import nextBuild from "next/dist/build"
import path from "path"
import { PayloadRequest } from "payload/types"
import { parse } from "url"
import mongoose from "mongoose"
import dotenv from "dotenv"

import watchlistRouter from "./app/watchlistRoutes"
import WatchlistModel from "./app/models/WatchlistItem"

import finishedRouter from "./app/finishedRoutes"
import watchingRouter from "./app/watchingRoutes"
import WatchingModel from "./app/models/WatchingItem"
import FinishedModel from "./app/models/FinishedItem"

dotenv.config()
const PORT = process.env.PORT || 10000
const app = express()

app.use(express.json())

const db = mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error))

app.use("/watchlists", watchlistRouter)
app.use("/watching", watchingRouter)
app.use("/finished", finishedRouter)

app.post("/add-to-watchlist", async (req, res) => {
  try {
    // Extract anime data from request body
    const { title } = req.body

    // Fetch anime data based on the title
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${title}&order_by=popularity&sort=asc&limit=1&sfw=true`
    )
    if (!response.ok) {
      throw new Error("Failed to fetch anime data")
    }
    const jsonData = await response.json()

    // Extract necessary data from the response
    const anime = jsonData.data[0]
    const animeData = {
      title: anime.title,
      imageUrl: anime.images.jpg.image_url || "",
      episodes: anime.episodes,
      mal_id: anime.mal_id,
      url: anime.url,
      // Add more fields as needed
    }

    // Insert data into MongoDB
    const insertedData = await WatchlistModel.create(animeData)

    res.json({ success: true, insertedData })
  } catch (error) {
    console.error("Error adding anime to watchlist:", error)
    res.status(500).json({ success: false, error })
  }
})

app.post("/add-to-watching", async (req, res) => {
  try {
    // Extract anime data from request body
    const { title } = req.body

    // Fetch anime data based on the title
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${title}&order_by=popularity&sort=asc&limit=1&sfw=true`
    )
    if (!response.ok) {
      throw new Error("Failed to fetch anime data")
    }
    const jsonData = await response.json()

    // Extract necessary data from the response
    const anime = jsonData.data[0]
    const animeData = {
      title: anime.title,
      imageUrl: anime.images.jpg.image_url || "",
      episodes: anime.episodes,
      mal_id: anime.mal_id,
      url: anime.url,
      // Add more fields as needed
    }

    // Insert data into MongoDB
    const insertedData = await WatchingModel.create(animeData)

    res.json({ success: true, insertedData })
  } catch (error) {
    console.error("Error adding anime to watching:", error)
    res.status(500).json({ success: false, error: error })
  }
})

app.post("/add-to-finished", async (req, res) => {
  try {
    // Extract anime data from request body
    const { title } = req.body

    // Fetch anime data based on the title
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${title}&order_by=popularity&sort=asc&limit=1&sfw=true`
    )
    if (!response.ok) {
      throw new Error("Failed to fetch anime data")
    }
    const jsonData = await response.json()

    // Extract necessary data from the response
    const anime = jsonData.data[0]
    const animeData = {
      title: anime.title,
      imageUrl: anime.images.jpg.image_url || "",
      episodes: anime.episodes,
      mal_id: anime.mal_id,
      url: anime.url,
      // Add more fields as needed
    }

    // Insert data into MongoDB
    const insertedData = await FinishedModel.create(animeData)

    res.json({ success: true, insertedData })
  } catch (error) {
    console.error("Error adding anime to finished:", error)
    res.status(500).json({ success: false, error: error })
  }
})

app.put("/watchlists/:mal_id", async (req, res) => {
  const { mal_id } = req.params
  const { currentEpisode } = req.body

  try {
    const watchlistItem = await WatchlistModel.findOneAndUpdate(
      { mal_id },
      { currentEpisode },
      { new: true }
    )

    if (!watchlistItem) {
      return res.status(404).json({ error: "Watchlist item not found" })
    }

    res.json(watchlistItem)
  } catch (error) {
    console.error("Error updating watchlist item:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.delete("/watchlists/:mal_id", async (req, res) => {
  const { mal_id } = req.params

  try {
    const deletedItem = await WatchlistModel.findOneAndDelete({ mal_id })

    if (!deletedItem) {
      return res.status(404).json({ error: "Watchlist item not found" })
    }

    res.json({ success: true, deletedItem })
  } catch (error) {
    console.error("Error deleting watchlist item:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.put("/watching/:mal_id", async (req, res) => {
  const { mal_id } = req.params
  const { currentEpisode } = req.body

  try {
    const watchingItem = await WatchingModel.findOneAndUpdate(
      { mal_id },
      { currentEpisode },
      { new: true }
    )

    if (!watchingItem) {
      return res.status(404).json({ error: "Watching item not found" })
    }

    res.json(watchingItem)
  } catch (error) {
    console.error("Error updating watchlist item:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.delete("/watching/:mal_id", async (req, res) => {
  const { mal_id } = req.params

  try {
    const deletedItem = await WatchingModel.findOneAndDelete({ mal_id })

    if (!deletedItem) {
      return res.status(404).json({ error: "Watching item not found" })
    }

    res.json({ success: true, deletedItem })
  } catch (error) {
    console.error("Error deleting watching item:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.put("/finished/:mal_id", async (req, res) => {
  const { mal_id } = req.params
  const { currentEpisode } = req.body

  try {
    const finishedItem = await FinishedModel.findOneAndUpdate(
      { mal_id },
      { currentEpisode },
      { new: true }
    )

    if (!finishedItem) {
      return res.status(404).json({ error: "Finished item not found" })
    }

    res.json(finishedItem)
  } catch (error) {
    console.error("Error updating finished item:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.delete("/finished/:mal_id", async (req, res) => {
  const { mal_id } = req.params

  try {
    const deletedItem = await FinishedModel.findOneAndDelete({ mal_id })

    if (!deletedItem) {
      return res.status(404).json({ error: "Finished item not found" })
    }

    res.json({ success: true, deletedItem })
  } catch (error) {
    console.error("Error deleting finished item:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
})

export type ExpressContext = inferAsyncReturnType<typeof createContext>

export type WebhookRequest = IncomingMessage & {
  rawBody: Buffer
}

const start = async () => {
  // const webhookMiddleware = bodyParser.json({
  //   verify: (req: WebhookRequest, _, buffer) => {
  //     req.rawBody = buffer
  //   },
  // })

  // app.post("/api/webhooks/stripe", webhookMiddleware, stripeWebhookHandler)

  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`)
      },
    },
  })

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info("Next.js is building for production")

      // @ts-expect-error
      await nextBuild(path.join(__dirname, "../"))

      process.exit()
    })

    return
  }

  // const cartRouter = express.Router()

  // cartRouter.use(payload.authenticate)

  // cartRouter.get("/", (req, res) => {
  //   const request = req as PayloadRequest

  //   if (!request.user) return res.redirect("/sign-in?origin=cart")

  //   const parsedUrl = parse(req.url, true)
  //   const { query } = parsedUrl

  //   return nextApp.render(req, res, "/cart", query)
  // })

  // app.use("/cart", cartRouter)
  // app.use(
  //   "/api/trpc",
  //   trpcExpress.createExpressMiddleware({
  //     router: appRouter,
  //     createContext,
  //   })
  // )

  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js started")

    app.listen(PORT, async () => {
      payload.logger.info(
        `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
      )
    })
  })
}

start()
