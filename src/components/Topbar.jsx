import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Topbar({ toggleDrawer }) {
  return (
    <AppBar
      position="fixed"
      variant={0}
      
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
  <IconButton edge="start" sx={{ color: '#000000', mr: 2 }} onClick={toggleDrawer}>
    <MenuIcon />
  </IconButton>
  <Typography
    variant="h6"
    sx={{
      flexGrow: 2,
      fontWeight: 'bold', // Makes the text bold
      color: '#000000',    // Ensures it's dark black
    }}
  >
    Dashboard
  </Typography>
  <IconButton sx={{ color: '#000000' }}>
    <NotificationsIcon />
  </IconButton>
</Toolbar>

    </AppBar>
  );
}
