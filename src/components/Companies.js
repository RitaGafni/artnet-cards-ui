import React, {useEffect, useState} from 'react'
import {fetchCompanies} from '../services/CompaniesServises'
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';

export default function Companies(props) {

const [companiesList, setCompaniesList] = useState()

    useEffect(() => {
        async function fetchCompaniesList() {
          console.log('this is the cu id', props.customerId);
          const data  = await fetchCompanies(props.customerId);
          setCompaniesList(data);
          console.log('the data', data);
        }
        fetchCompaniesList()
      }, [setCompaniesList, props.customerId]);

      const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'companyName', headerName: 'Company Name', width: 200 },
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
                    aria-label='edit company'
                    component='span'
                    onClick={() => handleEdit(row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color='primary'
                    aria-label='delete company'
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
            <Box   m='auto' style={{ height: 600, width: '40%' }}
>
               <DataGrid
        rows={companiesList}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
      </Box>
        </div>
    )
}
