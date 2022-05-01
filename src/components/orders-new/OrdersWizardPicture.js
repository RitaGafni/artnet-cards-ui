import React from 'react';
import Image from 'mui-image';
import defaultImg from '../../images/defaultImg.jpg';

export default function OrderPicture(props) {
  return (
    <div>
      <Image
        src={props.previewImg ? props.previewImg : defaultImg}
        height='100%'
        width='100%'
        duration={0}
        fit='contain'
      />
    </div>
  );
}
