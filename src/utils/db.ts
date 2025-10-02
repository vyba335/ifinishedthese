import { Db, MongoClient, ServerApiVersion } from "mongodb";
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

/* let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToMongoDB() {

    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable");
    }

    const client = new MongoClient(MONGODB_URI, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    await client.connect();
    cachedClient = client;
    cachedDb = client.db("ifinishedthese");

    return { client, db: client.db("ifinishedthese") };
}
 */

