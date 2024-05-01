import { Purchase } from './PurchaseTypes';

export const fetchPurchases = (): Promise<Purchase[]> => {
  return fetch('/api/currentMonth')
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(err => {
      console.error("Failed to fetch purchases:", err);
      throw err;
    });
};