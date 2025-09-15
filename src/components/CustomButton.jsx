import React from 'react';
import { Button } from '@mui/material';

export default function CustomButton({
  children,
  onClick,
  variant = 'contained',
  color = 'primary',
  sx = {},
  ...props
}) {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      sx={{
        textTransform: 'none',
        borderRadius: '3px',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
