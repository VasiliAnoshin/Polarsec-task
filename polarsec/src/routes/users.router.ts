import express, { Request, Response } from "express";
import UserDetails from "../models/user_details";
import {generateKeyPair}  from '../utils/crypto';
import {findUser, updateTotalDistanceRun, getRankingByType, createNewUser} from '../utils/db'

export const router = express.Router();
router.use(express.json());


router.post('/signup', async (req:Request, res:Response) => {
    try {
      const user = req.body as UserDetails;
      console.log(user)
      if (!user.name || !user.age || !user.city) {
        return res.status(400).json({ message: 'Missing required fields (name, age, city)' });
      }

      if (typeof user.name !== 'string' || typeof user.age !== 'number' || typeof user.city !== 'string') {
        return res.status(400).json({ message: 'Invalid data types for name, age, or city' });
      }
      const { privateKey, publicKey } = await generateKeyPair();
      user.total_distance_run = 0
      user.private_key = privateKey 
      user.public_key = publicKey
      
      if (await createNewUser(user)){
        res.json({ 'privateKey': user.private_key});
      } else{
        res.json({ 'privateKey': -1});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user' });
    }
  });


router.patch('/update', async (req:Request, res:Response) => {
  try {
    const { request } = req.body;
    let new_distance = -1
    const [data, signature] = request.split('.');

    if (!data || !signature) {
      return res.status(400).json({ message: 'Missing data or signature in request' });
    }
    console.log(atob(data))
    const {name, distance} = JSON.parse(atob(data));
    const user = await findUser(name, atob(data), signature)

    if (user) {
      new_distance = await updateTotalDistanceRun(user, distance)
    }

    res.json({"total_distance_run ": new_distance})
  } catch (error:any){
    console.error(error);
    res.status(500).json({ message: error.message || 'Internal Server Error'});
  }

})

router.get('/mystats',  async (req:Request, res:Response) => {
  try {
    const { request } = req.body;
    const [data, signature] = request.split('.');
    let ranking = -1
    if (!data || !signature) {
      return res.status(400).json({ message: 'Missing data or signature in request' });
    }
    console.log(atob(data))
    const {name, type} = JSON.parse(atob(data));
    const user = await findUser(name, atob(data), signature)
    if (user) {
      switch(type) {
        case 'city':
          ranking = await getRankingByType(user, user.city)
          break;
        case 'age':
          ranking = await getRankingByType(user, user.age)
          break;
        case 'overall':
          ranking = await getRankingByType(user, "")
          break;
      }
    }
    res.json({"ranking ": ranking})
  } catch (error:any){
    console.error(error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
})