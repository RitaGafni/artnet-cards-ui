import React from 'react'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { styled } from '@mui/material/styles';


const Input = styled('input')({
  display: 'none',
});

export default function AddPicture(props) {
  return (
    <div>
      <label htmlFor='icon-button-file'>
        <Input
          accept='image/*'
          id='icon-button-file'
          type='file'
          onChange={props.handleImgChange}
        />
        <IconButton
          color='primary'
          aria-label='upload picture'
          component='span'
        >
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  )
}
