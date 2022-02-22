import React from 'react'
import { Box } from '@mui/material'
import OrderdFields from './OrdersWizardFields'
import OrderPicture from './OrdersWizardPicture'

export default function OrderDetails() {
  return (
    <div>
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <OrderdFields/>
        <OrderPicture/>
      </Box>
      </div>
  )
}
