"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
var trpc_1 = require("../trpc/trpc");
var auth_router_1 = require("./auth-router");
exports.appRouter = (0, trpc_1.router)({
    auth: auth_router_1.authRouter,
});
