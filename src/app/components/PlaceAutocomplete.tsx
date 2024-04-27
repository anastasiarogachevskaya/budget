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
  const [value, setValue] = useState<Place | null>(null);

  useEffect(() => {
    fetch('/api/places')
      .then((res) => res.json())
      .then(setPlaces)
      .catch(console.error);
  }, []);

  return (
    <Autocomplete
      value={value ? value.name : null}
      onChange={(event, newValue: Place | string | null) => {
        if (typeof newValue === 'string') {
          setValue({
            name: newValue,
          });
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
              // Update the places state with the new place
              setValue({
                name: newValue.inputValue || 'Default Name',
              });
              setFormData({ ...formData, place: newValue.inputValue });
              setPlaces([...places, data]);
            })
            .catch(console.error);
        } else {
          setValue(null);
          setFormData({ ...formData, place: newValue?.name || '' });
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option: Place | string) => {
          if (typeof option === 'string') {
            return inputValue === option;
          } else {
            return inputValue === option.name;
          }
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
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option: Place | string) => <li {...props}>{typeof option === 'string' ? option : option.name}</li>}
      renderInput={(params) => <TextField {...params} name="place" label="Place" variant="outlined" InputLabelProps={{
        shrink: true,
      }}/>}
      freeSolo
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
    />
  );
}

export default PlaceAutocomplete;
