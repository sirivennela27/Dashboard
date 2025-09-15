import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DataRoute from './components/DataRoute';

function App() {
  return (
   
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DataRoute/>
      </LocalizationProvider>
  
  );
}

export default App;
