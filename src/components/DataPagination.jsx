import { TablePagination } from '@mui/material';
import React from 'react';

export default function DataPagination({ count, page, rowsPerPage, handlePageChange,handleRowsPerPageChange }) {
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={handlePageChange}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[3,5,8,10]} 
      onRowsPerPageChange={handleRowsPerPageChange}
      
sx={{
    '& .MuiTablePagination-actions button': {
      color: '#1E1E1E',
    },
    
'& .MuiTablePagination-toolbar': {
      color: '#1E1E1E', 
    },

  }}

    />
  );
}
