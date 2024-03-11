import mongoose from "mongoose"

const Schema = mongoose.Schema

const WatchlistItemSchema = new Schema({
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
  },
  currentEpisode: {
    type: Number,
    default: 0,
  },
  mal_id: {
    type: Number,

    unique: true,
  },
  url: {
    type: String,
  },
})

const WatchlistModel = mongoose.model("watchlistitems", WatchlistItemSchema)

export default WatchlistModel
