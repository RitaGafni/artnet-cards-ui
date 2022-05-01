import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
// import OrdersWizard from './OrdersWizard';

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
  const [openEdit, setOpenEdit] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState();
  const [deleteVer, setDeleteVer] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState('');
  const [editMode, setEditMode] = useState();

  const classes = useStyles();

  const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    {
      field: 'employeeName',
      headerName: 'Employee Name',
      width: 160,
    },
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
      field: 'TZ',
      headerName: 'Employee ID',
      width: 140,
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
              onClick={() => handleDelete(row)}
            >
              <DeleteIcon />
            </IconButton>
          </div>,
        ];
      },
    },
  ];

  function handleEdit(order) {
    setOrderToEdit(order);
    setEditMode(true);
    setOpenEdit(true);
  }

  function handleDelete(order) {
    setOrderToDelete(order);
    setDeleteVer(true);
  }

  return (
    <div>
      {/* <OrdersWizard
        selectedOrder={orderToEdit}
        orderToDelete={orderToDelete}
        editMode={editMode}
        setOpenEdit={setOpenEdit}
        openEdit={openEdit}
        setDeleteVer={setDeleteVer}
        deleteVer={deleteVer}
        customerId={props.customerId}
        setReloadOrders={props.setReloadOrders}
      /> */}
      <Box
        style={{ height: 600, width: '100%' }}
        sx={{
          '& .MuiDataGrid-row': {
            '&:nth-child(even)': {
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
          sx={{ bgcolor: '#F9F9F9' }}
          checkboxSelection
          disableSelectionOnClick
          rows={ordersData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          className={classes.root}
          onSelectionModelChange={(newSelectionModel) => {
            props.setSelectedOrders(newSelectionModel);
          }}
          selectionModel={props.selectedOrder}
        />
      </Box>
    </div>
  );
}
