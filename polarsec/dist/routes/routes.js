"use strict";
// import express, {Express, Request, Response} from "express";
// import generateKeyPair  from '../utils/crypto';
// import User from '../models/user';
// import { encode, decode } from 'js-base64';
// const router = express.Router();
// router.get("/", (req:Request, res:Response)=>{
//   res.send("Hello from TS")
// });
// router.post('/signup', async (req:Request, res:Response) => {
//   try {
//     const { name, age, city } = req.body;
//     if (!name || !age || !city) {
//       return res.status(400).json({ message: 'Missing required fields (name, age, city)' });
//     }
//     if (typeof name !== 'string' || typeof age !== 'number' || typeof city !== 'string') {
//       return res.status(400).json({ message: 'Invalid data types for name, age, or city' });
//     }
//     const { privateKey, publicKey } = await generateKeyPair();
//     const user = new User({ name, age, city, totalDistanceRun: 0, publicKey, privateKey});
//     console.log(user)
//     await user.save();
//     res.json({ 'privateKey': encode(privateKey) });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error creating user' });
//   }
// });
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
// export default router;
