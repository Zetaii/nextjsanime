import mongoose from "mongoose"

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const WatchlistItemSchema = new Schema({
  userId: {
    type: String,
  },
  animeId: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  episodes: {
    type: Number,
    required: true,
  },
  currentEpisode: {
    type: Number,
    default: 0,
  },
})

const WatchlistModel = mongoose.model("watchlistitems", WatchlistItemSchema)

export default WatchlistModel
