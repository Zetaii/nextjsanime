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
import router from "./app/watchlistRoutes"
import mongoose from "mongoose"
import dotenv from "dotenv"
import WatchlistModel from "./collections/WatchlistItem"
import watchlistRouter from "./app/watchlistRoutes"

dotenv.config()
const PORT = Number(process.env.PORT) || 3000
const app = express()

app.use(express.json())

const db = mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error))

app.use("/watchlists", watchlistRouter)

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
      // Add more fields as needed
    }

    // Insert data into MongoDB
    const insertedData = await WatchlistModel.create(animeData)

    res.json({ success: true, insertedData })
  } catch (error) {
    console.error("Error adding anime to watchlist:", error)
    res.status(500).json({ success: false, error: error })
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
  const webhookMiddleware = bodyParser.json({
    verify: (req: WebhookRequest, _, buffer) => {
      req.rawBody = buffer
    },
  })

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

  const cartRouter = express.Router()

  cartRouter.use(payload.authenticate)

  cartRouter.get("/", (req, res) => {
    const request = req as PayloadRequest

    if (!request.user) return res.redirect("/sign-in?origin=cart")

    const parsedUrl = parse(req.url, true)
    const { query } = parsedUrl

    return nextApp.render(req, res, "/cart", query)
  })

  app.use("/cart", cartRouter)
  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  )

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