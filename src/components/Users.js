import React, {useEffect, useState} from 'react'
import {fetchUsers} from '../Controllers/UsersServises'
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';

export default function Companies(props) {

const [usersList, setUsersList] = useState()

    useEffect(() => {
        async function fetchUsersList() {
          const { data } = await fetchUsers(props.customerId);
          setUsersList(data);
          console.log('the data', data);
        }
        fetchUsersList()
      }, [setUsersList, props.customerId]);

           
      const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'email', headerName: 'Email', width: 240 },
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
          }]

          function handleEdit(row){
              console.log(row);
          }
          function handleDelete(row){
            console.log(row);
        }
     

    return (
        <div>
            <Box  m='auto' 
 style={{ height: 600, width: '50%' }}
>
            { usersList && usersList[0] &&  <DataGrid
        rows={usersList}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />}
      </Box>
        </div>
    )
}