import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IosShareIcon from '@mui/icons-material/IosShare';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { IconButton, Tooltip } from '@mui/material/';
import DeleteMultipleOrders from './OrdersDeleteMultipleOrders';

export default function OrdersActions({ selectedOrders }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteSelectedOrders = () => {
    setOpenDeleteDialog(true);
  };

  return (
    <div className='actions'>
      <div>
        <Tooltip title='Delete orders' placement='top' arrow>
          <IconButton
            // color='secondary '
            sx={{ color: '#649B92' }}
            aria-label='new order'
            onClick={handleDeleteSelectedOrders}
          >
            <DeleteIcon fontSize='medium' />
          </IconButton>
        </Tooltip>
      </div>
      <div>
        {' '}
        <Tooltip title='Export orders' placement='top' arrow>
          <IconButton
            // color='secondary '
            sx={{ color: '#649B92' }}
            aria-label='new order'
            onClick={() => console.log('export to exel')}
          >
            <IosShareIcon fontSize='medium' />
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <Tooltip title='Change Status' placement='top' arrow>
          <IconButton
            // color='secondary '
            sx={{ color: '#649B92' }}
            aria-label='new order'
            onClick={() => console.log('export to exel')}
          >
            <PlaylistAddCheckCircleIcon fontSize='medium' />
          </IconButton>
        </Tooltip>
      </div>

      <DeleteMultipleOrders
        numberOfOrdersToDelete={selectedOrders.length}
        openDeleteDialog={openDeleteDialog}
        handleClickOpenDeleteDialog={handleClickOpenDeleteDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
      />
    </div>
  );
}
