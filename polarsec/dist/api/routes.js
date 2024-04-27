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
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("../utils/crypto"));
const user_1 = __importDefault(require("../models/user"));
const js_base64_1 = require("js-base64");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Hello from TS");
});
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age, city } = req.body;
        if (!name || !age || !city) {
            return res.status(400).json({ message: 'Missing required fields (name, age, city)' });
        }
        if (typeof name !== 'string' || typeof age !== 'number' || typeof city !== 'string') {
            return res.status(400).json({ message: 'Invalid data types for name, age, or city' });
        }
        const { privateKey, publicKey } = yield (0, crypto_1.default)();
        const user = new user_1.default({ name, age, city, totalDistanceRun: 0, publicKey, privateKey });
        console.log(user);
        yield user.save();
        res.json({ 'privateKey': (0, js_base64_1.encode)(privateKey) });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
}));
// router.post('/update', async (req, res) => {
//   const { request } = req.body;
//   try {
//     // const decodedRequest = JSON.parse(decode('base64', request));
//     // const { name, distance } = decodedRequest;
//     // const signature = request.split('.')[1];
//     // const user = await User.findOne({ name });
//     // if (!user || !verifySignature(user.publicKey, decodedRequest, signature)) {
//     //   return res.status(401).json({ message: 'Unauthorized' });
//     // }
//     // user.totalDistanceRun += distance;
//     // await user.save();
//     // res.json({ totalDistanceRun: user.totalDistanceRun });
//     res.json({ "uuu": "uuuu"});
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error updating user' });
//   }
// });
// router.post('/mystats', async (req, res) => {
//   const { request } = req.body;
//   try {
//     // const decodedRequest = JSON.parse(decode('base64', request));
//     // const { name, type } = decodedRequest;
//     // const signature = request.split('.')[1];
//     // const user = await User.findOne({ name });
//     // if (!user || !verifySignature(user.publicKey, decodedRequest, signature)) {
//     //   return res.status(401).json({ message: 'Unauthorized' });
//     // }
//     // let ranking = -1;
//     // switch (type) {
//     //   case 'city':
//     //     ranking = await User.find({ city: user.city, totalDistanceRun: { $gt: user.totalDistanceRun } }).countDocuments() + 1;
//     //     break;
//     //   case 'age':
//     //     ranking = await User.find({ age: user.age, totalDistanceRun: { $gt: user.totalDistanceRun } }).countDocuments() + 1;
//     //     break;
//     //   case 'overall':
//     //     ranking = await User.find({ totalDistanceRun: { $gt: user.totalDistanceRun } }).countDocuments() + 1;
//     //     break;
//     //   default:
//     //     return res.status(400).json({ message: 'Invalid stat option' });
//     // }
//     // res.json({ ranking });
//     res.json({ "fff": "uuuu"});
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error retrieving stats' });
//   }
// });
exports.default = router;
