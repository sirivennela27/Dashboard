import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 220;

export default function Sidebar({ open, onMenuClick }) {
  const Username=localStorage.getItem('username')
  const menuItems = [`Hi,${Username}`, 'Dashboard', 'Home', 'Profile', 'Messages', 'Settings'];
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <Box>
        <Toolbar />
        <List>
          {menuItems.map((text) => (
            <ListItem button key={text} onClick={() => onMenuClick(text)}>
              <ListItemText primary={text} 
               primaryTypographyProps={{
                fontWeight:'bold',
                fontSize:'medium',
                color:'#1E1E1E'}}
                />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Logout button at the bottom */}
      <Box >
        <ListItem button onClick={handleLogin}>
          <ListItemText primary="Logout"  primaryTypographyProps={{fontWeight:'bold',fontSize:'medium'}}/>
        </ListItem>
      </Box>
    </Drawer>
  );
}
