import { TextField, Typography,Box,Paper } from "@mui/material";
import { useState } from "react";
import CustomButton from "./CustomButton";

export default function ForgotPasswordForm(){
    const[email,setEmail]=useState('')

    
  const handleForgotPassword = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong.');
    }
  };

    return(
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
            <Paper sx={{p:4,width:400}}>
                <Typography variant="h6" sx={{mb:2}}>
                   Forgot Password
                </Typography>
                <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                sx={{mb:2}}
                />
                <CustomButton onClick={handleForgotPassword} fullWidth>
                    Rest Password

                </CustomButton>
                
            </Paper>

        </Box>
    )
} 