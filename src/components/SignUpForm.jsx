import React, { use, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Link,
  Paper,
} from '@mui/material';
import CustomButton from './CustomButton';

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const[email,setEmail]=useState('');

  const handleSignup = async () => {
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  try {
    const response = await fetch('http://localhost:5001/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password ,email }),
    });

    const result = await response.json();
    alert(result.message);
    if(result.success){
      localStorage.setItem('username',result.username)
    }
  } catch (error) {
    console.error('Signup error:', error);
    alert('Something went wrong.');
  }
};


  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: 400,
          borderRadius: 2,
          border: '1px solid #ccc',
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
          Request for ID
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
        />
         <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 3 }}
        />

        <CustomButton
          onClick={handleSignup}
          sx={{ backgroundColor: '#5067AA', color: '#fff', mb: 3 }}
          fullWidth
        >
          Sign Up
        </CustomButton>

        <Box sx={{ textAlign: 'center' }}>
          <Link href="/" underline="hover">
            Already have an account? Login
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}
