import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import app from '../firebase';
import { ref, database } from 'firebase/storage';

export default function OrderUploadImage(props) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  function pickedHandler(e) {
    if (e.target.files && e.target.files.length === 1) {
      setFile(e.target.files[0]);
      console.log(file);
    }
  }

  // async function pickedImageHandler() {
  //   try {
  //     setError('');
  //     const res = await storage.database().ref(`images/${file.name}`).put(file);
  //     console.log('res', res);
  //   } catch (e) {
  //     setError(e);
  //     console.log('error', error);
  //   }
  // }

  return (
    <div>
      {' '}
      <div className='form-controll center'>
        <input
          id={props.id}
          type='file'
          accept='.jpg, .pnd, jpeg'
          onChange={pickedHandler}
        />
      </div>
      <div>
        <Button onClick={null}>Upload</Button>
      </div>
    </div>
  );
}
