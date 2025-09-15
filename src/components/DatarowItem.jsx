import { TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DatarowItem({ rows, onDelete }) {
  const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:5001/api/soft-delete-vehicle/${id}`, {
      method: 'PATCH'
    });

    if (res.ok) {
      onDelete(id);
    } else {
      const data = await res.json();
      console.error(data.message || 'Failed to delete vehicle');
    }
  } catch (err) {
    console.error('Error deleting vehicle:', err);
  }
};

  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.ID}>
          <TableCell sx={cellStyle}>{row.ID}</TableCell>
          <TableCell sx={cellStyle}>{row.Model}</TableCell>
          <TableCell sx={cellStyle}>{row.Brand}</TableCell>
          <TableCell sx={cellStyle}>{row.Country}</TableCell>
          <TableCell sx={cellStyle}>{row.Business_segment}</TableCell>
          <TableCell sx={cellStyle}>{row.Manufacturing_Year}</TableCell>
          <TableCell sx={cellStyle}>{row.Startdate}</TableCell>
          <TableCell sx={actionCellStyle}>
            <IconButton aria-label="delete" onClick={()=>handleDelete(row.ID)}>
              <DeleteIcon sx={{ color: '#1E1E1E' }}/>
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

const cellStyle = {
  backgroundColor: '#FFFFFF',
  color: '#1E1E1E',
  fontSize: '0.9rem',
  borderBottom: '1px solid #E0E0E0',
};

const actionCellStyle = {
  backgroundColor: '#FFFFFF',
  borderBottom: '1px solid #E0E0E0',
  color:'#1E1E1E!important'
};
