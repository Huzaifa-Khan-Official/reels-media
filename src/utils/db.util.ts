import { configs } from "@/constants/configs";
import mongoose from "mongoose";

if (!configs.mongodbUri) {
    throw new Error("MONGODB_URI is not defined");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { connection: null, promise: null };
}

export async function dbConnect() {
    if (cached.connection) {
        return cached.connection;
    }

    if (!cached.promise) {
        const options = {
            bufferCommands: true,
            maxPoolSize: 10,
        }

        mongoose.connect(configs.mongodbUri, options)
            .then(() => mongoose.connection);
    }

    try {
        cached.connection = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.connection;
}