// pages/api/purchase.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

interface PurchaseData {
  purchaseDate: string;
  place: string;
  buyer: string;
  amount: number;
  splitPercentage: number;
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
      const { purchaseDate, place, buyer, amount, splitPercentage } = req.body;

      const client = await clientPromise;
      const db = client.db();
      
      const result = await db.collection('budget').insertOne({
        purchaseDate,
        place,
        buyer,
        amount: parseFloat(amount), // Convert string to number if necessary
        splitPercentage: parseInt(splitPercentage, 10) // Convert string to integer if necessary
      });

      const purchase = await db.collection('budget').findOne({_id: result.insertedId});
      if (purchase) {
        res.status(201).json({
          purchaseDate: purchase.purchaseDate,
          place: purchase.place,
          buyer: purchase.buyer,
          amount: purchase.amount,
          splitPercentage: purchase.splitPercentage,
        });
      } else {
        res.status(404).json({ error: 'Purchase not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'An error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
