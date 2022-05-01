import React, { useEffect, useState } from 'react';
import { fetchCompanies } from '../../services/CustomerViewServices';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import CompaniesWizard from './CompaniesWizard';
import SelectTemplate from './CompaniesSelectTemplate';
import BasicSearch from '../BasicSearch';
import AddButton from '../AddButton';
import { filterAllData } from '../../models/CustomersModel';

export default function Companies(props) {
  const [companiesList, setCompaniesList] = useState();
  const [openWizard, setOpenWizard] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState();
  const [editMode, setEditMode] = useState();
  const [searchQ, setSearchQ] = useState('');
  const [selectedCompany, setSelectedCompany] = useState();

  useEffect(() => {
    async function fetchCompaniesList() {
      const data = await fetchCompanies(props.customerId);
      setCompaniesList(data);
    }
    fetchCompaniesList();
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
    },
    {
      field: 'templates',
      type: 'templates',
      headerName: 'Templates',
      width: 100,
      cellClassName: 'templates',
      getActions: ({ row }) => {
        return [
          <div>
            {/* <SelectTemplate /> */}
            rita
          </div>,
        ];
      },
    },
  ];

  function handleEdit(row) {
    console.log(row);
    setCompanyToEdit(row);
    setEditMode(true);
    setOpenWizard(true);
  }
  function handleDelete(row) {
    setCompanyToEdit(row);
  }

  return (
    <div>
      <CompaniesWizard
        openWizard={openWizard}
        setOpenWizard={setOpenWizard}
        companyToEdit={companyToEdit}
        editMode={editMode}
      />
      <div className='companies'>
        <div className='select-and-add'>
          <BasicSearch
            style={{ width: '60%' }}
            searchQ={searchQ}
            setSearchQ={setSearchQ}
            category='companies'
          />
          <AddButton setSelectedItem={setSelectedCompany} />
        </div>
        <Box m='auto' style={{ height: 600, width: '70%' }}>
          <DataGrid
            sx={{ bgcolor: '#F9F9F9' }}
            rows={
              companiesList &&
              companiesList[0] &&
              filterAllData(companiesList, searchQ)
            }
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
}
