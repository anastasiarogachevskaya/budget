'use client'
import React, { createContext, useContext, useState } from 'react';

const PurchaseContext = createContext({
  refetchPurchases: () => {},
});

export const usePurchaseContext = () => useContext(PurchaseContext);

export const PurchaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [key, setKey] = useState(0); // You can use any state logic to trigger updates

  const refetchPurchases = () => {
    setKey(prevKey => prevKey + 1); // Increment key to trigger re-fetch
  };

  return (
    <PurchaseContext.Provider value={{ refetchPurchases }}>
      {children}
    </PurchaseContext.Provider>
  );
};