"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUser = exports.getRankingByType = exports.updateTotalDistanceRun = exports.findUser = void 0;
const database_service_1 = require("../services/database.service");
const crypto_1 = require("../utils/crypto");
class NoDatabaseConnectionError extends Error {
    constructor() {
        super("There is no connection to the database");
    }
}
function findUser(name, data, signature) {
    return __awaiter(this, void 0, void 0, function* () {
        if (database_service_1.collections.user_details) {
            const users = yield database_service_1.collections.user_details.find({ name: name }).toArray();
            for (const user of users) {
                const virified = yield (0, crypto_1.getSignatureVerify)(data, signature, user.public_key);
                if (virified) {
                    return user;
                }
            }
            return null;
        }
        throw new NoDatabaseConnectionError();
    });
}
exports.findUser = findUser;
function updateTotalDistanceRun(user, providedDistance) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (database_service_1.collections.user_details) {
                const new_distance = user.total_distance_run + providedDistance;
                yield database_service_1.collections.user_details.updateOne({ _id: user._id }, { $set: { total_distance_run: new_distance } });
                return new_distance;
            }
            throw new NoDatabaseConnectionError();
        }
        catch (error) {
            throw error;
        }
    });
}
exports.updateTotalDistanceRun = updateTotalDistanceRun;
function getRankingByType(user, type) {
    return __awaiter(this, void 0, void 0, function* () {
        if (database_service_1.collections.user_details) {
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
            const results = yield database_service_1.collections.user_details.aggregate(pipeline).toArray();
            for (const result of results) {
                if (result.name === user.name && result.private_key == user.private_key) {
                    return result.denseRankQuantityForState;
                }
            }
        }
        throw new NoDatabaseConnectionError();
    });
}
exports.getRankingByType = getRankingByType;
function createNewUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (database_service_1.collections.user_details) {
                const res = yield database_service_1.collections.user_details.insertOne(user);
                return res.acknowledged;
            }
            throw new NoDatabaseConnectionError();
        }
        catch (error) {
            throw error;
        }
    });
}
exports.createNewUser = createNewUser;
