import React from 'react';
import {
  Button,
  Paper,
  Badge,
  Stack,
  IconButton,
  Box,
  CardMedia,
  Card,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BadgeIcon from '@mui/icons-material/Badge';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';

export default function CustomerItem(props) {
  const history = useHistory();
  const useStyles = makeStyles({
    media: {
      height: 150,
      width: '90%',
      objectFit: 'contain',
    },
  });

  const classes = useStyles();

  function handleSelectCustomer() {
    history.push(`/?${props.selectedCustomer.customerId}`);
  }

  return (
    <div>
      <Badge
        badgeContent={props.selectedCustomer.new_orders}
        color='primary'
        sx={{
          '& .MuiBadge-badge': {
            fontSize: 14,
            height: 24,
          },
        }}
      >
        <Paper sx={{ width: 200 }}>
          <Card asbutton='true'>
            <Stack direction='row' alignItems='left'>
              <Typography variant='h7' component='div'>
                <Tooltip title='Edit' placement='top' arrow>
                  <IconButton
                    color='primary'
                    aria-label='edit customer'
                    component='span'
                    onClick={() => props.handleEdit(props.selectedCustomer)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                {props.selectedCustomer.customer_name}
              </Typography>
            </Stack>
            <Button>
              <Box sx={{ width: 200, hight: 220 }}>
                <CardMedia
                  className={classes.media}
                  onClick={handleSelectCustomer}
                  component='img'
                  height='160'
                  image={props.selectedCustomer.logo}
                  alt={props.selectedCustomer.customer_name}
                  fit='fit'
                />
              </Box>
            </Button>
          </Card>
        </Paper>
      </Badge>
    </div>
  );
}
