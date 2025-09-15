import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

export default function SingleSelect({ label, options, value, onChange, required = true }) {
  const hasError = required && !value;

  return (
    <FormControl
      fullWidth
      size="small"
      error={hasError}
      required={required}
    >
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        id={`${label}-select`}
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          height: '40px',
          '& .MuiSelect-select': {
            padding: '8px 12px',
          },
        }}
      >
        {options.map((option, idx) => (
          <MenuItem key={idx} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {hasError && <FormHelperText>{label} is required</FormHelperText>}
    </FormControl>
  );
}
