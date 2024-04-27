// pages/api/purchase.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

interface PurchaseData {
  date: string;
  place: string;
  buyer: string;
  amount: string; // Assuming amount is passed as a string from the form, you may want to convert it to a number.
  splitPercentage: string; // Assuming splitPercentage is passed as a string, you may also want to convert this to a number.
}

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PurchaseData | ErrorResponse>
) {
  if (req.method === 'POST') {
    try {
      const { date, place, buyer, amount, splitPercentage } = req.body;

      const client = await clientPromise;
      const db = client.db(); // Replace with your database name if not using the default
      
      const result = await db.collection('budget').insertOne({
        date,
        place,
        buyer,
        amount: parseFloat(amount), // Convert string to number if necessary
        splitPercentage: parseInt(splitPercentage, 10) // Convert string to integer if necessary
      });

      const purchase = await db.collection('purchases').findOne({_id: result.insertedId});

      res.status(201).json(purchase);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'An error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
