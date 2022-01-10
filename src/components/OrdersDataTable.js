import React from 'react';
import { DataGrid, GridRow } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import clsx from 'clsx';
import { GridToolbar } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { GridActionsCellItem, useGridApiRef } from '@mui/x-data-grid-pro';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& .MuiDataGrid-renderingZone': {
        '& .MuiDataGrid-row': {
          '&:nth-child(2n)': {
            backgroundColor: '#5C7AEA',
          },
        },
      },
    },
  })
);

export default function OrdersTable(props) {
  const ordersData = props.ordersData;
  console.log(ordersData);

  const classes = useStyles();

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'employeeName', headerName: 'Employee Name', width: 160 },
    { field: 'company', headerName: 'Company', width: 160 },
    {
      field: 'status',
      headerName: 'Status',
      cellClassName: (params) =>
        clsx('super-app', {
          new: params.value === 'new',
          shipped: params.value === 'shipped',
          printed: params.value === 'printed',
          approved: params.value === 'approved',
        }),
    },
    {
      field: 'creationDate',
      headerName: 'Creation Date',
      type: 'date',
      width: 160,
    },
    {
      field: 'customer',
      headerName: 'Customer Id',
      type: 'number',
      width: 120,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ row }) => {
        return [
          <div>
            <IconButton
              color='primary'
              aria-label='edit customer'
              component='span'
              onClick={() => handleEdit(row)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color='primary'
              aria-label='delete customer'
              component='span'
              onClick={() => handleDelete(row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>,
        ];
      },
    },
  ];

  function handleEdit(id) {
    console.log('handle edit order', id);
  }

  function handleDelete(id) {
    console.log('handle delete order', id);
  }

  const handleClick = (event) => {
    console.log('click');
    console.log(event);
  };

  return (
    <div>
      <Box
        style={{ height: 600, width: '100%' }}
        sx={{
          '& .MuiDataGrid-row': {
            '&:nth-child(2n)': {
              backgroundColor: '#F3F1F5',
            },
            '&:hover': {
              backgroundColor: '#EDEDED',
              cursor: 'default',
            },
          },
          '& .super-app.new': {
            backgroundColor: '#F6D7A7',
          },
          '& .super-app.approved': {
            backgroundColor: '#F0D9FF',
          },
          '& .super-app.printed': {
            backgroundColor: '#D1E8E4',
          },
          '& .super-app.shipped': {
            backgroundColor: '#CDF2CA',
          },
        }}
      >
        <DataGrid
          rows={ordersData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[20]}
          checkboxSelection
          className={classes.root}
        />
      </Box>
    </div>
  );
}
