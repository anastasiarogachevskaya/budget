// pages/api/places.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db();

  if (req.method === 'POST') {
    try {
      const { name } = req.body;
      const existingPlace = await db.collection('places').findOne({ name });

      if (!existingPlace) {
        await db.collection('places').insertOne({ name });
        res.status(201).send({ message: 'Place added' });
      } else {
        res.status(409).send({ message: 'Place already exists' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } 
  else if (req.method === 'GET') {
    try {
      const places = await db.collection('places').find({}).toArray();
      res.status(200).json(places);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } 
  else {
    res.status(405).send({ message: 'Method Not Allowed' });
  }
}
