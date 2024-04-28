import { useEffect, useState } from 'react';
import { TextField, Autocomplete, createFilterOptions } from '@mui/material';

const filter = createFilterOptions<Place | string>();

interface Place {
  inputValue?: string;
  name: string;
}

interface PlaceAutocompleteProps {
  formData: any;
  setFormData: (data: any) => void;
}

function PlaceAutocomplete({ formData, setFormData }: PlaceAutocompleteProps) {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    fetch('/api/places')
      .then((res) => res.json())
      .then(setPlaces)
      .catch(console.error);
  }, []);

  return (
    <Autocomplete
      onChange={(event, newValue: Place | string | null) => {
        if (typeof newValue === 'string') {
          setFormData({ ...formData, place: newValue });
        } else if (newValue && newValue.inputValue) {
          fetch('/api/places', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newValue.inputValue }),
          })
            .then((res) => res.json())
            .then((data) => {
              setFormData({ ...formData, place: newValue.inputValue });
              setPlaces([...places, data]);
            })
            .catch(console.error);
        } else {
          setFormData({ ...formData, place: newValue?.name || '' });
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);   
        const { inputValue } = params;
        const isExisting = options.some((option: Place | string) => {
          if (typeof option === 'string') {
            return inputValue === option;
          } else if (option) { // Add this check
            return inputValue === option.name;
          }
          return false;
        });
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            name: `Add "${inputValue}"`,
          });
        }
        return filtered;
      }}
      options={places.map((place) => place.name)}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option && option.inputValue) {
          return option.inputValue;
        }
        return option.name;
      }}
      renderOption={(props, option: Place | string) => <li {...props}>{typeof option === 'string' ? option : option.name}</li>}
      renderInput={(params) => <TextField {...params} name="place" label="Place" variant="outlined" InputLabelProps={{
        shrink: true,
      }}/>}
      value={formData.place}
      freeSolo
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
    />
  );
}

export default PlaceAutocomplete;