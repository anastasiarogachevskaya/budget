'use client'

import React, { useState } from 'react';
import { TextField, MenuItem, Button, Box, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { fi } from 'date-fns/locale';
import PlaceAutocomplete from './PlaceAutocomplete';

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

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  
    try {
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      // Handle success, e.g., clear form, show success message
      setFormData({
        ...formData,
        place: '', // Clear the 'Place' field
        amount: '', // Clear the 'amount' field
      });
    } catch (error) {
      console.error('Failed to save purchase', error);
      // Handle error, e.g., show error message to user
    }
  };
  

  return (
    <Box component="form" noValidate autoComplete="off" maxWidth="40%">
      <FormControl fullWidth sx={{ mt: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
          <DatePicker
            label="Date of Purchase"
            format="dd/MM/yyyy"
            value={formData.purchaseDate}
            onChange={handleDateChange}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </LocalizationProvider>
      </FormControl>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <PlaceAutocomplete formData={formData} setFormData={setFormData} />
      </FormControl>

      <TextField
        name="buyer"
        select
        fullWidth
        label="Buyer"
        value={formData.buyer}
        onChange={handleInputChange}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        required
      >
        <MenuItem value="A">Nastasija</MenuItem>
        <MenuItem value="S">Reysge</MenuItem>
      </TextField>
      <FormControl fullWidth sx={{ mt: 1 }}>
        <InputLabel htmlFor="amount">Amount</InputLabel>
        <OutlinedInput
          name='amount'
          id="amount"
          startAdornment={<InputAdornment position="start">€</InputAdornment>}
          label="Amount"
          value={formData.amount}
          onChange={handleInputChange}
          type='number'
          required
        />
      </FormControl>
      <TextField
        name="splitPercentage"
        select
        fullWidth
        label="Split Percentage"
        value={formData.splitPercentage}
        onChange={handleInputChange}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        defaultValue={50}
        required
      >
        <MenuItem value="50">50%</MenuItem>
        <MenuItem value="100">100%</MenuItem>
      </TextField>
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default PurchaseForm;
