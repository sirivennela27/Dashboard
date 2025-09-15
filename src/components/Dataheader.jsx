import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

const headCells = [
  { id: 'ID', label: 'ID' },
  { id: 'Model', label: 'Model' },
  { id: 'Brand', label: 'Brand' },
  { id: 'Country', label: 'Country' },
  { id: 'Business_segment', label: 'Business Segment' },
  { id: 'Manufacturing_Year', label: 'Manufacturing Year' },
  { id: 'Startdate', label: 'Start Date' },
];


export default function Dataheader({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => () => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
  sx={{
    backgroundColor: '#F5F5F5', 
    color: '#1E1E1E',           
    fontWeight: 'bold',
    fontSize: '0.95rem',
    borderBottom: '2px solid #E0E0E0',
  
  }}
  elevation={0}
>

           <TableSortLabel
              active
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{
                    color: '#1E1E1E',
                    '&.Mui-active': {
                    color: '#1E1E1E',
                  },
                    '& .MuiTableSortLabel-icon': {
                    color: '#1E1E1E !important',
            },
                 }}

            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
          
        ))}
        <TableCell
  
sx={{
            backgroundColor: '#F5F5F5',
            color: '#1E1E1E',
            fontWeight: 'bold',
            fontSize: '0.95rem',
            borderBottom: '2px solid #E0E0E0',
            textAlign: 'center',
          }}

>
  Action
</TableCell>

      </TableRow>
    </TableHead>
  );
}
