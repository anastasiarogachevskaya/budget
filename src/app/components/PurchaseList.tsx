'use client'

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Purchase {
  purchaseDate: string;
  place: string;
  buyer: string;
  amount: number;
  splitPercentage: number;
}

type Order = 'asc' | 'desc';


const convertDate = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
}

function PurchaseList() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const fetchPurchases = () => {
    fetch('/api/currentMonth')
      .then(res => res.json())
      .then(data => setPurchases(data))
      .catch(err => console.error("Failed to fetch purchases:", err));
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Place</TableCell>
            <TableCell>Buyer</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Split %</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchases.map((purchase) => (
            <TableRow key={purchase.purchaseDate + purchase.place}>
              <TableCell component="th" scope="row">
              {convertDate(purchase.purchaseDate)}
              </TableCell>
              <TableCell>{purchase.place}</TableCell>
              <TableCell>{purchase.buyer}</TableCell>
              <TableCell align="right">{purchase.amount.toLocaleString('fi-FI', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 })}</TableCell>
              <TableCell align="right">{purchase.splitPercentage}.00%</TableCell>
              <TableCell align="right">{(purchase.amount * purchase.splitPercentage / 100).toLocaleString('fi-FI', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 })}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PurchaseList;
