// db.ts

import mongoose, { Connection } from "mongoose"

// MongoDB connection string
const mongoURI: string = "mongodb://localhost:27017/your-database-name"

// Connect to MongoDB
const connectDB = async (): Promise<Connection> => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("MongoDB Connected")
    return conn.connection
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message)
    process.exit(1)
  }
}

export default connectDB
