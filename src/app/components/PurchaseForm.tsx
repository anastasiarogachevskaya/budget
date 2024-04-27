'use client'

import React, { useState } from 'react';
import { TextField, MenuItem, Button, Box, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';
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
    <Box component="form" noValidate autoComplete="off" maxWidth="40%" >
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
      <FormControl fullWidth sx={{ mt: 1 }}>
        <TextField
          name="place"
          fullWidth
          label="Place"
          value={formData.place}
          onChange={handleInputChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
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
      >
        <MenuItem value="Person 1">Nastasija</MenuItem>
        <MenuItem value="Person 2">Reysge</MenuItem>
      </TextField>
      <FormControl fullWidth sx={{ mt: 1 }}>
        <InputLabel htmlFor="amount">Amount</InputLabel>
        <OutlinedInput
          id="amount"
          startAdornment={<InputAdornment position="start">€</InputAdornment>}
          label="Amount"
          value={formData.amount}
          onChange={handleInputChange}
          type='number'
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
      >
        <MenuItem value="50">50%</MenuItem>
        <MenuItem value="100">100%</MenuItem>
      </TextField>
      <Button variant="contained" onClick={() => {/* Submit logic here */}}>
        Submit
      </Button>
    </Box>
  );
};

export default PurchaseForm;
