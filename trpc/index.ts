import { router } from "../trpc/trpc"
import { publicProcedure } from "../trpc/trpc"

export const appRouter = router({
  auth: authrouter,
})

export type AppRouter = typeof appRouter
