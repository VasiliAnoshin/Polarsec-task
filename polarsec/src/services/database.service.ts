// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import process from "process";

// Global Variables
export const collections: { user_details?: mongoDB.Collection } = {}

// Initialize Connection
 export async function connectToDatabase(): Promise<void> {
    try {
      dotenv.config();
  
      // Validate environment variables
      if (!process.env.DB_NAME || !process.env.COLLECTION_NAME || !process.env.DB_CONN_STRING) {
        throw new Error('Missing required environment variables: DB_NAME / COLLECTION_NAME / DB_CONN_STRING');
      }
  
      const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
      await client.connect();

      const db = client.db(process.env.DB_NAME);
      const userCollection = db.collection(process.env.COLLECTION_NAME);
  
      collections.user_details = userCollection
  
      console.log(`Successfully connected to database: ${db.databaseName} and collection: ${userCollection.collectionName}`);
    } catch (error) {
      throw error
    }
  }