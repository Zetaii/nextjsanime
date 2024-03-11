"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Watchlists = void 0;
exports.Watchlists = {
    slug: "watchlists",
    auth: {},
    access: {},
    admin: {},
    fields: [
        {
            name: "title",
            label: "Title",
            type: "text",
            required: true,
        },
        {
            name: "description",
            label: "Description",
            type: "textarea",
        },
        // Add fields for storing API data from Shikimori
        {
            name: "shikimoriId",
            label: "Shikimori ID",
            type: "text",
            required: true,
        },
        {
            name: "shikimoriTitle",
            label: "Shikimori Title",
            type: "text",
            required: true,
        },
        // Add more fields as needed to store Shikimori API data
    ],
};
