import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Link,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/CustomButton'; 
import { useAuth } from '../components/Authcontext';


export default function Login_page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {setIsAuthenticated}=useAuth();

  const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:5001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log(result.message);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Something went wrong. Please try again.');
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
          Login
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
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />

        <CustomButton
          onClick={handleLogin}
          sx={{ backgroundColor: '#5067AA', color: '#fff', mb: 3 }}
          fullWidth
        >
          Login
        </CustomButton>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Link href="/forgot-password" underline="hover">
            Forgot Password?
          </Link>
          <Link href="/signup" underline="hover">
            Request for ID
          </Link>
          <Link href="" underline="hover">
            Login with SSO
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}
