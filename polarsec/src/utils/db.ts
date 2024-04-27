import { collections } from "../services/database.service";
import { getSignatureVerify}  from '../utils/crypto';
import UserDetails from "../models/user_details";
import type { WithId, Document } from 'mongodb'

class NoDatabaseConnectionError extends Error {
    constructor() {
      super("There is no connection to the database");
    }
}

async function findUser(name:string, data:string, signature:string): Promise<WithId<Document> | null> {
    if (collections.user_details) {
        const users = await collections.user_details.find({ name: name }).toArray();
        for (const user of users){
            const virified = await getSignatureVerify(data, signature, user.public_key)
            if (virified) {
                return user
            }
        }
        return null
    }
    throw new NoDatabaseConnectionError()
}

async function updateTotalDistanceRun(user: WithId<Document>, providedDistance:number): Promise<number> {
    try {
        if (collections.user_details) {
            const new_distance = user.total_distance_run + providedDistance
            await collections.user_details.updateOne({ _id: user._id }, { $set: { total_distance_run: new_distance} });
            return new_distance
        }
    throw new NoDatabaseConnectionError()
    } catch (error) {
        throw error
    }
}

async function getRankingByType(user: WithId<Document>, type:string): Promise<number>{
    if (collections.user_details) {
        const pipeline = [
          {
            $setWindowFields: {
              partitionBy: type,
              sortBy: { total_distance_run: -1 },
              output: {
                denseRankQuantityForState: { $denseRank: {} },
              },
            },
          },
        ];
        
        const results = await collections.user_details.aggregate(pipeline).toArray();
        for (const result of results) {
          if (result.name === user.name && result.private_key == user.private_key) {
            return result.denseRankQuantityForState;
          }
        }
    }
    throw new NoDatabaseConnectionError()
}

async function createNewUser(user: UserDetails): Promise<boolean> {
    try {
        if (collections.user_details) {
            const res = await collections.user_details.insertOne(user);
            return res.acknowledged
        }
        throw new NoDatabaseConnectionError()
    }
    catch (error) {
        throw error
    }
}

export {findUser, updateTotalDistanceRun, getRankingByType, createNewUser}