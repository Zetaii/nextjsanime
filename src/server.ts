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

dotenv.config()
const PORT = Number(process.env.PORT) || 3000
const app = express()

app.use(express.json())

const db = mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error))

app.post("/watchlistitems", async (req, res) => {
  console.log(req.body)
  const newWatchlistItem = new WatchlistModel({
    user: req.body.user,
    anime: req.body.anime,
  })
  const createdWatchlist = await newWatchlistItem.save()
  res.json(createdWatchlist)
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
