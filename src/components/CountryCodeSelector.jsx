import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material';
import countries from '../assets/static/country.code.json';

const CountryCodeSelector = ({ value, onChange }) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="country-code-select-label">Select Country Code</InputLabel>
      <Select
        labelId="country-code-select-label"
        value={value || ''}
        onChange={onChange}
        input={<OutlinedInput label="Select Country Code" />}
      >
        {countries.map((country) => (
          <MenuItem key={country.iso} value={country.code}>
            {`${country.country} (+${country.code})`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountryCodeSelector;
