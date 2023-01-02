import { MongoClient } from "mongodb";

// const uri = import.meta.env.VITE_MONGODB_URI
const uri = "mongodb+srv://pwhb:MnpXav1T4HvIImZY@cluster0.pwhe6.mongodb.net/?retryWrites=true&w=majority"


const client = new MongoClient(uri)

export const clientPromise = client.connect()