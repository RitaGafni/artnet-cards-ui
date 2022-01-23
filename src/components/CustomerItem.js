import React from 'react'
import {
    Button,
    Paper,
    Badge,
    Stack,
    IconButton,
    Box,
    CardMedia,
    Card, 
    Typography
  } from '@mui/material';
  import EditIcon from '@mui/icons-material/Edit';
  import { makeStyles } from '@mui/styles';



export default function CustomerItem(props) {
  

  
  const useStyles = makeStyles({
    media: {           // this is the`className` passed to `CardMedia` later
      height: 150,     // as an example I am modifying width and height
      width: '90%',
      objectFit: 'contain',
    }

  })

  const classes = useStyles()

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
                    <Card
                      asButton
                      onClick={() =>
                        console.log(props.selectedCustomer.customer_name)
                      }
                    >
                      <Stack direction='row' alignItems='left' spacing={2}>
                        <Typography gutterTop variant='h7' component='div'>
                          <IconButton
                            color='primary'
                            aria-label='edit customer'
                            component='span'
                            onClick={() => props.handleEdit(props.selectedCustomer)}
                          >
                            <EditIcon />
                          </IconButton>
                          {props.selectedCustomer.customer_name}
                        </Typography>
                      </Stack>
                      <Button>
                        <Box sx={{ width: 200, hight: 220 }}>
                          <CardMedia
                                    className={classes.media}

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
    )
}
