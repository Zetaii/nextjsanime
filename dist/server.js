"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var get_payload_1 = require("./get-payload");
var next_utils_1 = require("./next-utils");
// import { stripeWebhookHandler } from "./webhooks"
var build_1 = __importDefault(require("next/dist/build"));
var path_1 = __importDefault(require("path"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var watchlistRoutes_1 = __importDefault(require("./app/watchlistRoutes"));
var WatchlistItem_1 = __importDefault(require("./app/models/WatchlistItem"));
var finishedRoutes_1 = __importDefault(require("./app/finishedRoutes"));
var watchingRoutes_1 = __importDefault(require("./app/watchingRoutes"));
var WatchingItem_1 = __importDefault(require("./app/models/WatchingItem"));
var FinishedItem_1 = __importDefault(require("./app/models/FinishedItem"));
dotenv_1.default.config();
var PORT = process.env.PORT || 10000;
var app = (0, express_1.default)();
app.use(express_1.default.json());
var db = mongoose_1.default
    .connect(process.env.MONGODB_URL)
    .then(function () { return console.log("Connected to MongoDB"); })
    .catch(function (error) { return console.log("MongoDB connection error:", error); });
app.use("/watchlists", watchlistRoutes_1.default);
app.use("/watching", watchingRoutes_1.default);
app.use("/finished", finishedRoutes_1.default);
app.post("/add-to-watchlist", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var title, response, jsonData, anime, animeData, insertedData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                title = req.body.title;
                return [4 /*yield*/, fetch("https://api.jikan.moe/v4/anime?q=".concat(title, "&order_by=popularity&sort=asc&limit=1&sfw=true"))];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Failed to fetch anime data");
                }
                return [4 /*yield*/, response.json()
                    // Extract necessary data from the response
                ];
            case 2:
                jsonData = _a.sent();
                anime = jsonData.data[0];
                animeData = {
                    title: anime.title,
                    imageUrl: anime.images.jpg.image_url || "",
                    episodes: anime.episodes,
                    mal_id: anime.mal_id,
                    url: anime.url,
                    // Add more fields as needed
                };
                return [4 /*yield*/, WatchlistItem_1.default.create(animeData)];
            case 3:
                insertedData = _a.sent();
                res.json({ success: true, insertedData: insertedData });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error("Error adding anime to watchlist:", error_1);
                res.status(500).json({ success: false, error: error_1 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.post("/add-to-watching", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var title, response, jsonData, anime, animeData, insertedData, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                title = req.body.title;
                return [4 /*yield*/, fetch("https://api.jikan.moe/v4/anime?q=".concat(title, "&order_by=popularity&sort=asc&limit=1&sfw=true"))];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Failed to fetch anime data");
                }
                return [4 /*yield*/, response.json()
                    // Extract necessary data from the response
                ];
            case 2:
                jsonData = _a.sent();
                anime = jsonData.data[0];
                animeData = {
                    title: anime.title,
                    imageUrl: anime.images.jpg.image_url || "",
                    episodes: anime.episodes,
                    mal_id: anime.mal_id,
                    url: anime.url,
                    // Add more fields as needed
                };
                return [4 /*yield*/, WatchingItem_1.default.create(animeData)];
            case 3:
                insertedData = _a.sent();
                res.json({ success: true, insertedData: insertedData });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error("Error adding anime to watching:", error_2);
                res.status(500).json({ success: false, error: error_2 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.post("/add-to-finished", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var title, response, jsonData, anime, animeData, insertedData, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                title = req.body.title;
                return [4 /*yield*/, fetch("https://api.jikan.moe/v4/anime?q=".concat(title, "&order_by=popularity&sort=asc&limit=1&sfw=true"))];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Failed to fetch anime data");
                }
                return [4 /*yield*/, response.json()
                    // Extract necessary data from the response
                ];
            case 2:
                jsonData = _a.sent();
                anime = jsonData.data[0];
                animeData = {
                    title: anime.title,
                    imageUrl: anime.images.jpg.image_url || "",
                    episodes: anime.episodes,
                    mal_id: anime.mal_id,
                    url: anime.url,
                    // Add more fields as needed
                };
                return [4 /*yield*/, FinishedItem_1.default.create(animeData)];
            case 3:
                insertedData = _a.sent();
                res.json({ success: true, insertedData: insertedData });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.error("Error adding anime to finished:", error_3);
                res.status(500).json({ success: false, error: error_3 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.put("/watchlists/:mal_id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mal_id, currentEpisode, watchlistItem, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mal_id = req.params.mal_id;
                currentEpisode = req.body.currentEpisode;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, WatchlistItem_1.default.findOneAndUpdate({ mal_id: mal_id }, { currentEpisode: currentEpisode }, { new: true })];
            case 2:
                watchlistItem = _a.sent();
                if (!watchlistItem) {
                    return [2 /*return*/, res.status(404).json({ error: "Watchlist item not found" })];
                }
                res.json(watchlistItem);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error("Error updating watchlist item:", error_4);
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.delete("/watchlists/:mal_id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mal_id, deletedItem, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mal_id = req.params.mal_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, WatchlistItem_1.default.findOneAndDelete({ mal_id: mal_id })];
            case 2:
                deletedItem = _a.sent();
                if (!deletedItem) {
                    return [2 /*return*/, res.status(404).json({ error: "Watchlist item not found" })];
                }
                res.json({ success: true, deletedItem: deletedItem });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.error("Error deleting watchlist item:", error_5);
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.put("/watching/:mal_id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mal_id, currentEpisode, watchingItem, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mal_id = req.params.mal_id;
                currentEpisode = req.body.currentEpisode;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, WatchingItem_1.default.findOneAndUpdate({ mal_id: mal_id }, { currentEpisode: currentEpisode }, { new: true })];
            case 2:
                watchingItem = _a.sent();
                if (!watchingItem) {
                    return [2 /*return*/, res.status(404).json({ error: "Watching item not found" })];
                }
                res.json(watchingItem);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.error("Error updating watchlist item:", error_6);
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.delete("/watching/:mal_id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mal_id, deletedItem, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mal_id = req.params.mal_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, WatchingItem_1.default.findOneAndDelete({ mal_id: mal_id })];
            case 2:
                deletedItem = _a.sent();
                if (!deletedItem) {
                    return [2 /*return*/, res.status(404).json({ error: "Watching item not found" })];
                }
                res.json({ success: true, deletedItem: deletedItem });
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                console.error("Error deleting watching item:", error_7);
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.put("/finished/:mal_id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mal_id, currentEpisode, finishedItem, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mal_id = req.params.mal_id;
                currentEpisode = req.body.currentEpisode;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, FinishedItem_1.default.findOneAndUpdate({ mal_id: mal_id }, { currentEpisode: currentEpisode }, { new: true })];
            case 2:
                finishedItem = _a.sent();
                if (!finishedItem) {
                    return [2 /*return*/, res.status(404).json({ error: "Finished item not found" })];
                }
                res.json(finishedItem);
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                console.error("Error updating finished item:", error_8);
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.delete("/finished/:mal_id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mal_id, deletedItem, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mal_id = req.params.mal_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, FinishedItem_1.default.findOneAndDelete({ mal_id: mal_id })];
            case 2:
                deletedItem = _a.sent();
                if (!deletedItem) {
                    return [2 /*return*/, res.status(404).json({ error: "Finished item not found" })];
                }
                res.json({ success: true, deletedItem: deletedItem });
                return [3 /*break*/, 4];
            case 3:
                error_9 = _a.sent();
                console.error("Error deleting finished item:", error_9);
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
var createContext = function (_a) {
    var req = _a.req, res = _a.res;
    return ({
        req: req,
        res: res,
    });
};
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    var payload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)({
                    initOptions: {
                        express: app,
                        onInit: function (cms) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                cms.logger.info("Admin URL: ".concat(cms.getAdminURL()));
                                return [2 /*return*/];
                            });
                        }); },
                    },
                })];
            case 1:
                payload = _a.sent();
                if (process.env.NEXT_BUILD) {
                    app.listen(PORT, function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    payload.logger.info("Next.js is building for production");
                                    // @ts-expect-error
                                    return [4 /*yield*/, (0, build_1.default)(path_1.default.join(__dirname, "../"))];
                                case 1:
                                    // @ts-expect-error
                                    _a.sent();
                                    process.exit();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
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
                app.use(function (req, res) { return (0, next_utils_1.nextHandler)(req, res); });
                next_utils_1.nextApp.prepare().then(function () {
                    payload.logger.info("Next.js started");
                    app.listen(PORT, function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            payload.logger.info("Next.js App URL: ".concat(process.env.NEXT_PUBLIC_SERVER_URL));
                            return [2 /*return*/];
                        });
                    }); });
                });
                return [2 /*return*/];
        }
    });
}); };
start();
