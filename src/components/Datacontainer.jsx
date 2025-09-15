import { useState ,useEffect} from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Box, Toolbar } from '@mui/material';
import DataTable from './DataTable';
import Cards from './Cards';
import TableAction from './TableAction';

export default function Datacontainer() {
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicles, setVehicles] = useState([]); 

// Fetch data once when component mounts
useEffect(() => {
  fetch('http://localhost:5001/api/vehicles')
    .then(res => res.json())
    .then(json => setVehicles(json))
    .catch(err => console.error('Failed to fetch vehicle data:', err));
}, []);



  const toggleDrawer = () => {
    setOpen(!open);
  };

  const drawerWidth = 220;

  return (
    <Box sx={{ display: 'flex' }}>
      <Topbar toggleDrawer={toggleDrawer} />
      <Sidebar open={open} toggleDrawer={toggleDrawer} onMenuClick={setSelectedMenu} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: open ? `${drawerWidth}px` : '64px',
          transition: 'margin 0.3s ease',
        }}
      >
        <Toolbar />
        <Box sx={{ width: '100%', px: 2 }}>
          {selectedMenu === 'Dashboard' && (
            <>
              <Cards vehicles={vehicles} />
       <TableAction searchTerm={searchTerm} setSearchTerm={setSearchTerm} onAddVehicle={(newVehicle) => setVehicles(prev => [...prev, newVehicle])} />
        <DataTable
  drawerWidth={drawerWidth}
  open={open}
  searchTerm={searchTerm}
  vehicles={vehicles}
  setVehicles={setVehicles}
/>


            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
