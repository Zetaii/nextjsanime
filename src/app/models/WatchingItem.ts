import mongoose from "mongoose"

const Schema = mongoose.Schema

const WatchingItemSchema = new Schema({
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
  mal_id: {
    type: Number,
    required: true,
    unique: true,
  },
  url: {
    type: String,
  },
})

const WatchingModel = mongoose.model("watchingItem", WatchingItemSchema)

export default WatchingModel