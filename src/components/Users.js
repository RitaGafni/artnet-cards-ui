import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { fetchUsers } from '../services/CustomerViewServices';
import { fetchCompanies } from '../services/CustomerViewServices';
import BasicSearch from './BasicSearch';
import AddButton from './AddButton';
import { filterAllData } from '../models/CustomersModel';

export default function Companies(props) {
  const [usersList, setUsersList] = useState();
  const [companiesList, setCompaniesList] = useState();
  const [searchQ, setSearchQ] = useState('');
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    async function fetchUsersList() {
      const data = await fetchUsers(props.customerId);
      setUsersList(data);
    }
    fetchUsersList();
  }, [setUsersList, props.customerId]);

  useEffect(() => {
    async function fetchCompaniesList() {
      const data = await fetchCompanies(props.customerId);
      setCompaniesList(data);
    }
    fetchCompaniesList();
  }, [setCompaniesList, props.customerId]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'email', headerName: 'Email', width: 240 },
    { field: 'companyId', headerName: 'Company', width: 240 },
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
              aria-label='edit user'
              component='span'
              onClick={() => handleEdit(row)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color='primary'
              aria-label='delete user'
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

  function handleEdit(row) {
    console.log(row);
  }
  function handleDelete(row) {
    console.log(row);
  }

  return (
    <div>
      <div className='select-and-add'>
        <BasicSearch
          style={{ width: '60%' }}
          searchQ={searchQ}
          setSearchQ={setSearchQ}
          category='users'
        />
        <AddButton setSelectedItem={setSelectedUser} />
      </div>
      <Box m='auto' style={{ height: 600, width: '70%' }}>
        <DataGrid
          sx={{ bgcolor: '#F9F9F9' }}
          rows={usersList && usersList[0] && filterAllData(usersList, searchQ)}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </div>
  );
}
