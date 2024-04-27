// pages/api/test-db.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | { error: string }>
) {
  try {
    const client = await clientPromise;
    const db = client.db(); // Specify your database name if necessary

    // Perform a simple find() query to test the connection
    await db.collection('yourcollection').find({}).limit(1).toArray();

    res.status(200).json({ message: 'Successfully connected to MongoDB' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to connect to MongoDB' });
  }
}
