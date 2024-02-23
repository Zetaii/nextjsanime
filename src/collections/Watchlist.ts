import { CollectionConfig, Access } from "payload/types"

const watchlistAccess: Access = ({ req }) => {
  // Adjust the access control logic based on your requirements
  return req.user !== undefined // Only authenticated users can access watchlists
}

export const Watchlists: CollectionConfig = {
  slug: "watchlists",
  auth: {
    verify: {},
  },
  access: {
    read: watchlistAccess,
    create: watchlistAccess,
    update: watchlistAccess,
    delete: watchlistAccess,
  },
  admin: {
    // Define admin interface settings as needed
    defaultColumns: ["id"],
  },
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
}
