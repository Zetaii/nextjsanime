"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var WatchingItemSchema = new Schema({
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
});
var WatchingModel = mongoose_1.default.model("watchingItem", WatchingItemSchema);
exports.default = WatchingModel;
