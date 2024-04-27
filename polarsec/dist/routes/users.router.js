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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const crypto_1 = require("../utils/crypto");
const db_1 = require("../utils/db");
exports.router = express_1.default.Router();
exports.router.use(express_1.default.json());
exports.router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        console.log(user);
        if (!user.name || !user.age || !user.city) {
            return res.status(400).json({ message: 'Missing required fields (name, age, city)' });
        }
        if (typeof user.name !== 'string' || typeof user.age !== 'number' || typeof user.city !== 'string') {
            return res.status(400).json({ message: 'Invalid data types for name, age, or city' });
        }
        const { privateKey, publicKey } = yield (0, crypto_1.generateKeyPair)();
        user.total_distance_run = 0;
        user.private_key = privateKey;
        user.public_key = publicKey;
        if (yield (0, db_1.createNewUser)(user)) {
            res.json({ 'privateKey': user.private_key });
        }
        else {
            res.json({ 'privateKey': -1 });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
}));
exports.router.patch('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { request } = req.body;
        let new_distance = -1;
        const [data, signature] = request.split('.');
        if (!data || !signature) {
            return res.status(400).json({ message: 'Missing data or signature in request' });
        }
        console.log(atob(data));
        const { name, distance } = JSON.parse(atob(data));
        const user = yield (0, db_1.findUser)(name, atob(data), signature);
        if (user) {
            new_distance = yield (0, db_1.updateTotalDistanceRun)(user, distance);
        }
        res.json({ "total_distance_run ": new_distance });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
}));
exports.router.get('/mystats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { request } = req.body;
        const [data, signature] = request.split('.');
        let ranking = -1;
        if (!data || !signature) {
            return res.status(400).json({ message: 'Missing data or signature in request' });
        }
        console.log(atob(data));
        const { name, type } = JSON.parse(atob(data));
        const user = yield (0, db_1.findUser)(name, atob(data), signature);
        if (user) {
            switch (type) {
                case 'city':
                    ranking = yield (0, db_1.getRankingByType)(user, user.city);
                    break;
                case 'age':
                    ranking = yield (0, db_1.getRankingByType)(user, user.age);
                    break;
                case 'overall':
                    ranking = yield (0, db_1.getRankingByType)(user, "");
                    break;
            }
        }
        res.json({ "ranking ": ranking });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
}));
