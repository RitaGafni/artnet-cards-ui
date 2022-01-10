import React, {useEffect, useState} from 'react';
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import Image from 'mui-image'




export default function TryToUpload() {
  const [photo, setPhoto] = useState(null);
  const [imgUrl, setImgUrl] = useState('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')
  const [imgPreviewUrl, setPreviewImgUrl] = useState('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')

  const uploadRef = ref(storage, 'download.png');
  



  function handleChange(e) {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      setPreviewImgUrl(URL.createObjectURL(e.target.files[0]));
      setPhoto(e.target.files[0])
    }
  }

  function handleClick() {
    upload(uploadRef, photo);
  }

  async function upload(fileRef, file){

    const snapshot = await uploadBytes(fileRef, file);
    const URL    = await getDownloadURL(fileRef);
    setImgUrl(URL)
  }


  return (
    <div>
      <input type='file' id='file-input' name='ImageStyle' onChange={handleChange}/>
      <button  disabled={ !photo} onClick={handleClick} >uplaod</button>
      <Image src={imgUrl} height='20%' width='20%'  />
      <Image src={imgPreviewUrl} height='20%' width='20%'  />

    </div>
  );
}
