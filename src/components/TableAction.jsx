import { Box, Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import Vehicle_form from "./Vehical_form";
import CustomButton from "./CustomButton";

export default function TableAction({ searchTerm, setSearchTerm ,onAddVehicle}) {
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
      <TextField
  variant="outlined"
  placeholder="Search"
  size="small"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  sx={{
    backgroundColor: '#F5F5F5', 
    borderRadius: 1,
    input: { color: '#1E1E1E' }, 
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E0E0E0', 
      },
      '&:hover fieldset': {
        borderColor: '#BDBDBD',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#9E9E9E',
      },
    },
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon sx={{ color: '#1E1E1E' }} />
      </InputAdornment>
    ),
  }}
/>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <CustomButton variant="contained" sx={{ backgroundColor: '#fbf6e4ff',color:'#1E1E1E',fontWeight:'bold' }} onClick={handleOpenForm}>
          + Add Vehicle
        </CustomButton>
        <Vehicle_form open={openForm} handleClose={handleCloseForm} onAddVehicle={onAddVehicle} />
        <CustomButton variant="contained" sx={{ backgroundColor: '#fbf6e4ff',color:'#1E1E1E',fontWeight:'bold' }}>
          + Mass Upload
        </CustomButton>
      </Box>
    </Box>
  );
}
