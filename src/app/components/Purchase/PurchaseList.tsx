'use client'

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material';
import { Purchase, SortingOrder } from './PurchaseTypes';
import { fetchPurchases } from './fetchPurchases';
import { convertDate } from './formatUtils';
import { stableSort, getComparator } from './sortingUtils';

function PurchaseList() {
  const [order, setOrder] = useState<SortingOrder>('asc');
  const [orderBy, setOrderBy] = useState<keyof Purchase>('purchaseDate');
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    fetchPurchases().then(setPurchases);
  }, []);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Purchase) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableSortLabel
              active={orderBy === 'purchaseDate'}
              direction={orderBy === 'purchaseDate' ? order : 'asc'}
              onClick={(event) => handleRequestSort(event, 'purchaseDate')}
            >
              <TableCell>Date</TableCell>
            </TableSortLabel>
            <TableCell>Place</TableCell>
            <TableCell>Buyer</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Split %</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(purchases, getComparator(order, orderBy)).map((purchase) => (
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
