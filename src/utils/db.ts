import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectToMongoDB = async () => {
    if (!MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable");
    }
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: "ifinishedthese",
        });
    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
}

export default connectToMongoDB;