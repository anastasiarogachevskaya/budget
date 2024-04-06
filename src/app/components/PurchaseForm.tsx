'use client'

import React, { useState } from 'react';
import { TextField, MenuItem, Button, Box } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { fi } from 'date-fns/locale';

interface PurchaseFormProps {
  // Interface details can be added here.
}

const PurchaseForm: React.FC<PurchaseFormProps> = () => {
  const [formData, setFormData] = useState({
    purchaseDate: new Date(),
    place: '',
    buyer: '',
    amount: '',
    splitPercentage: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleDateChange = (newValue: Date | null) => {
    if (newValue !== null) {
      setFormData({ ...formData, purchaseDate: newValue });
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
        <DatePicker
          label="Date of Purchase"
          format="dd/MM/yyyy"
          value={formData.purchaseDate}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
      <TextField
        name="place"
        fullWidth
        label="Place"
        value={formData.place}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        name="buyer"
        select
        fullWidth
        label="Buyer"
        value={formData.buyer}
        onChange={handleInputChange}
        margin="normal"
      >
        <MenuItem value="Person 1">Person 1</MenuItem>
        <MenuItem value="Person 2">Person 2</MenuItem>
      </TextField>
      <TextField
        name="amount"
        fullWidth
        label="Amount"
        value={formData.amount}
        onChange={handleInputChange}
        type="number"
        margin="normal"
      />
      <TextField
        name="splitPercentage"
        select
        fullWidth
        label="Split Percentage"
        value={formData.splitPercentage}
        onChange={handleInputChange}
        margin="normal"
      >
        <MenuItem value="50">50%</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>
      <Button variant="contained" onClick={() => {/* Submit logic here */}}>
        Submit
      </Button>
    </Box>
  );
};

export default PurchaseForm;
