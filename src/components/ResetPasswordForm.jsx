import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CustomButton from './CustomButton';

export default function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    } 

    try {
      const response = await fetch('http://localhost:5001/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, new_password: newPassword }),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Reset error:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Reset Your Password</Typography>

        <TextField
          label="New Password"
          type="password"
          variant="outlined"  
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 2 }}  
        />

        <CustomButton onClick={handleReset} fullWidth>
          Reset Password
        </CustomButton>
      </Paper>
    </Box>
  );
}
