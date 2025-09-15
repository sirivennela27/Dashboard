import React, { useState } from 'react';
import { Table, TableContainer, Paper } from '@mui/material';
import Dataheader from './Dataheader';
import DatarowItem from './DatarowItem';
import DataPagination from './DataPagination';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function DataTable({ searchTerm = '', vehicles = [], setVehicles }) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('ID');
  const [rowsPerPage, setRowsPerPage] = useState(5);

 
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  
  const filteredData = Array.isArray(vehicles)
    ? vehicles.filter((row) =>
        Object.values(row).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];

  const sortedData = [...filteredData].sort(getComparator(order, orderBy));
  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper elevation={0} sx={{ backgroundColor: '#eceaeaff', borderRadius: 1, overflow: 'hidden' }}>
      <TableContainer component={Paper} sx={{ backgroundColor: '#1E1E1E' }}>
        <Table>
          <Dataheader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          {paginatedData.length > 0 ? (
            <DatarowItem rows={paginatedData} onDelete={(id)=>setVehicles(prev => prev.filter(v=>v.ID!==id))} />
          ) : (
            <tbody>
              <tr>
                <td colSpan={7} style={{ color: 'white', textAlign: 'center', padding: '1rem' }}>
                  No results found.
                </td>
              </tr>
            </tbody>
          )}
        </Table>
      </TableContainer>
      <DataPagination
        page={page}
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
  );
}
