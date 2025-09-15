import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DatePicker } from '@mui/x-date-pickers';
import SingleSelect from './SingleSelect'; // Your reusable dropdown component
import CustomButton from './CustomButton';

export default function Vehicle_form({ open, handleClose,onAddVehicle }) {

const handleSubmit = async (e) => {
  e?.preventDefault?.();
  console.log("Submit clicked")
  const formData = {
    // Base Info
    Year: year,
    Quarter: quarter,
    Country: country,
    Subsidiary: subsidiary,
    Currency: currency,
    Brand:brand,
    Model:model,
    Business_segment:businessSegment,

    // Vehicle Info
    Manufacturing_Year: mfgYear,
    Fuel_Type: fuelType,
    Classification: classification,
    Status: status,
    VIN: vin,
    License_Plate: plate,
    Startdate: startDate,
    Expiration_Date: expirationDate,
    Last_Mileage: lastMileage,
    Last_Mileage_Date: lastMileageDate,
    CO2_Emissions: co2Emissions,
    Avg_Fuel_Consumption: avgFuelConsumption,
    Actual_Fuel_Consumption: actualFuelConsumption,
    Electricity_Consumption: electricityConsumption,

    // Assignment Info
    Employee_ID: employeeId,
    Ownership: ownership,
    Lease_Company: leaseCompany,
    Contract_Length: contractLength,
    Contractual_Mileage: contractualMileage,

    // Cost Info
    Depreciation_Cost: depreciationCost,
    Accidents: accidents,
    Rentals: rentals,
    Maintenance: maintenance,
    Insurance: insurance,
    Fuel_Cost: fuelCost,
    Total_Cost: totalCost
  };
  console.log("Form Data:", formData);

  try {
    const response = await fetch('http://localhost:5001/api/add-vehicle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    if (response.ok && result.vehicle) {
      console.log('Success:', result.message);
      onAddVehicle(result.vehicle);
      handleClose(); 
    } else if (response.ok && result.vehicle_id){
      onAddVehicle({...formData,ID:result.vehicle_id});
      handleClose(); 
    }else{
      alert(result.message)
      console.error("Add vehicle failed" , result)
    }
    
  } catch (error) {
    console.error('Fetch error:', error);
  }
};


  // Base Info
  const [year, setYear] = useState('2022');
  const [quarter, setQuarter] = useState('Q1');
  const [country, setCountry] = useState('India');
  const [currency, setCurrency] = useState('INR');
  const [subsidiary, setSubsidiary] = useState('');
  const[brand,setBrand]=useState('')
  const[model,setModel]=useState('')
  const[businessSegment,setBussinesssegment]=useState('')

  // Vehicle Info
  const [mfgYear, setMfgYear] = useState('2022');
  const [fuelType, setFuelType] = useState('Petrol');
  const [classification, setClassification] = useState('Sedan');
  const [status, setStatus] = useState('Active');
  const[vin,setvin]=useState('');
  const[plate,setlicenseplate]=useState('')
  const [startDate, setStartDate] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [lastMileage, setLastMileage] = useState('');
  const [lastMileageDate, setLastMileageDate] = useState(null);
  const [co2Emissions, setCo2Emissions] = useState('');
  const [avgFuelConsumption, setAvgFuelConsumption] = useState('');
  const [actualFuelConsumption, setActualFuelConsumption] = useState('');
  const [electricityConsumption, setElectricityConsumption] = useState('');

  // Assignment Info
  const [employeeId, setEmployeeId] = useState('');
  const [ownership, setOwnership] = useState('Company Owned');
  const [leaseCompany, setLeaseCompany] = useState('');
  const [contractLength, setContractLength] = useState('');
  const [contractualMileage, setContractualMileage] = useState('');

  // Cost Info
  const [depreciationCost, setDepreciationCost] = useState('');
  const [accidents, setAccidents] = useState('');
  const [rentals, setRentals] = useState('');
  const [maintenance, setMaintenance] = useState('');
  const [insurance, setInsurance] = useState('');
  const [fuelCost, setFuelCost] = useState('');
  const [totalCost, setTotalCost] = useState('');

  // Dropdown Options
  const yearOptions = ['2022', '2023', '2024', '2025'];
  const quarterOptions = ['Q1', 'Q2', 'Q3', 'Q4'];
  const countryOptions = ['India', 'USA', 'Germany'];
  const currencyOptions = ['INR', 'USD', 'EUR'];
  const mfgYearOptions = ['2022', '2023', '2024', '2025'];
  const fuelTypeOptions = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const classificationOptions = ['Sedan', 'SUV', 'Truck', 'Van'];
  const statusOptions = ['Active', 'Inactive', 'Pending'];
  const ownershipOptions = ['Company Owned', 'Leased', 'Employee Owned'];

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{fontWeight:'bold'}}>Vehicle Details</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Base Information */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{fontWeight:'bold'}}>Base Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <SingleSelect label="Year" options={yearOptions} value={year} onChange={setYear} required />
                </Grid>
                <Grid item xs={6}>
                  <SingleSelect label="Quarter" options={quarterOptions} value={quarter} onChange={setQuarter} required />
                </Grid>
                <Grid item xs={6}>
                  <SingleSelect label="Country" options={countryOptions} value={country} onChange={setCountry} required/>
                </Grid>
                <Grid item xs={6}>
                  <TextField variant='outlined' label="Subsidiary" value={subsidiary} onChange={(e) => setSubsidiary(e.target.value)} fullWidth size="small" required/>
                </Grid>
                 <Grid item xs={6}>
                  <TextField variant='outlined' label="Brand" value={brand} required onChange={(e) => setBrand(e.target.value)} fullWidth size="small"/>
                </Grid>
                  <Grid item xs={6}>
                  <TextField variant='outlined' label="Model" value={model} required onChange={(e) => setModel(e.target.value)} fullWidth size="small"/>
                </Grid>
                  <Grid item xs={6}>
                  <TextField variant='outlined' label="Business Segment" value={businessSegment} required onChange={(e) => setBussinesssegment(e.target.value)} fullWidth size="small"/>
                </Grid>
                <Grid item xs={6}>
                  <SingleSelect label="Currency" options={currencyOptions} value={currency} onChange={setCurrency} required/>
                </Grid>
              </Grid>
               
            </AccordionDetails>
          </Accordion>

          {/* Vehicle Information */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{fontWeight:'bold'}}>Vehicle Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <SingleSelect label="Mfg. Year" options={mfgYearOptions} value={mfgYear} required onChange={setMfgYear}/>
                </Grid>
                <Grid item xs={6}>
                  <SingleSelect label="Fuel Type" options={fuelTypeOptions} value={fuelType} required onChange={setFuelType} />
                </Grid>
                <Grid item xs={6}>
                  <SingleSelect label="Classification" options={classificationOptions} value={classification} onChange={setClassification} required/>
                </Grid>
                <Grid item xs={6}>
                  <SingleSelect label="Status" options={statusOptions} value={status} onChange={setStatus} required/>
                </Grid>
                <Grid item xs={6}>
                  <TextField variant='outlined'  label="VIN #" value={vin} onChange={(e) => setvin(e.target.value)} fullWidth size="small" required />
                </Grid>
                <Grid item xs={6}>
                  <TextField variant='outlined'  label="License Plate #" value={plate} onChange={(e) => setlicenseplate(e.target.value)} fullWidth size="small"required />
                </Grid>
                <Grid item xs={6}>
  <DatePicker
  label="Start Date"
  value={startDate}
  onChange={setStartDate}
  slotProps={{
    textField: {
      required: true,
      fullWidth: true,
      size: 'small',
      variant: 'outlined',
      sx: {
        '& .MuiInputBase-root': {
          minHeight: '40px',
        },
        '& .MuiOutlinedInput-input': {
          padding: '8px 14px',
        },
      },
    },
  }}
/>

</Grid>

                <Grid item xs={6}>
                  <DatePicker label="Expiration Date" value={expirationDate} onChange={setExpirationDate} slotProps={{
    textField: {
      required: true,
      fullWidth: true,
      size: 'small',
      variant: 'outlined',
      sx: {
        '& .MuiInputBase-root': {
          minHeight: '40px',
        },
        '& .MuiOutlinedInput-input': {
          padding: '8px 14px',
        },
      },
    },
  }}/>
                </Grid>
                <Grid item xs={6}>
                  <TextField variant='outlined'  label="Last Mileage" value={lastMileage} required onChange={(e) => setLastMileage(e.target.value)} fullWidth size="small" />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker label="Last Mileage Date" value={lastMileageDate} onChange={setLastMileageDate} slotProps={{
    textField: {
      required: true,
      fullWidth: true,
      size: 'small',
      variant: 'outlined',
      sx: {
        '& .MuiInputBase-root': {
          minHeight: '40px',
        },
        '& .MuiOutlinedInput-input': {
          padding: '8px 14px',
        },
      },
    },
  }} />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Average CO2 Emissions" value={co2Emissions} required onChange={(e) => setCo2Emissions(e.target.value)} fullWidth size="small"/>
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Average Fuel Consumption" value={avgFuelConsumption}required onChange={(e) => setAvgFuelConsumption(e.target.value)} fullWidth size="small"/>
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Actual Fuel Consumption" value={actualFuelConsumption} required onChange={(e) => setActualFuelConsumption(e.target.value)} fullWidth size="small" />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Electricity Consumption" value={electricityConsumption} required onChange={(e) => setElectricityConsumption(e.target.value)} fullWidth size="small" />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Assignment Information */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{fontWeight:'bold'}}>Assignment Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField label="Employee ID" value={employeeId} required onChange={(e) => setEmployeeId(e.target.value)} fullWidth size="small" />
                </Grid>
                <Grid item xs={6}>
                  <SingleSelect label="Ownership" options={ownershipOptions} value={ownership} required onChange={setOwnership} />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Lease Company" value={leaseCompany} required onChange={(e) => setLeaseCompany(e.target.value)} fullWidth size="small"/>
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Contract Length" value={contractLength} required onChange={(e) => setContractLength(e.target.value)} fullWidth size="small" />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Contractual Mileage Per Year" value={contractualMileage} required onChange={(e) => setContractualMileage(e.target.value)} fullWidth size="small"/>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Cost Information */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{fontWeight:'bold'}}>Cost Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField label="Depreciation Cost" value={depreciationCost} required onChange={(e) => setDepreciationCost(e.target.value)} fullWidth size="small" />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Accidents" value={accidents} required onChange={(e) => setAccidents(e.target.value)} fullWidth size="small" />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Rentals" value={rentals} required onChange={(e) => setRentals(e.target.value)} fullWidth size="small" />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Maintenance" value={maintenance}  required onChange={(e) => setMaintenance(e.target.value)} fullWidth size="small"/>
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Insurance" value={insurance} required onChange={(e) => setInsurance(e.target.value)} fullWidth  size="small"/>
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Fuel Cost" value={fuelCost} required onChange={(e) => setFuelCost(e.target.value)} fullWidth size="small"/>
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Total Cost" value={totalCost} required onChange={(e) => setTotalCost(e.target.value)} fullWidth size="small" />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Box>
      </DialogContent>
      <DialogActions>
        <CustomButton variant="contained" sx={{ backgroundColor: '#f8ecbfff',color:'#1E1E1E',fontWeight:'bold' }} onClick={handleClose}>Cancel</CustomButton>
        <CustomButton variant="contained" sx={{ backgroundColor: '#f8ecbfff',color:'#1E1E1E',fontWeight:'bold' }} onClick={handleSubmit}>Submit</CustomButton>
      </DialogActions>
    </Dialog>
  );
}
