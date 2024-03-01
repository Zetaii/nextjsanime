import mongoose from "mongoose"

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const WatchlistItemSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  anime: {
    type: String,
    required: true,
  },
})

const WatchlistModel = mongoose.model("watchlistitems", WatchlistItemSchema)

export default WatchlistModel
