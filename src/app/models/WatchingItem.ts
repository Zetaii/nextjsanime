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

const WatchingModel = mongoose.model("watchingItem", WatchingItemSchema)

export default WatchingModel
