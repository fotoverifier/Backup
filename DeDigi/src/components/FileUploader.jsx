import React from 'react';
import ButtonLined from './ButtonLined';
import Icon from './Icon';
import { generalIcons } from '../constants/icons';

function FileUploader(props) {
  const hiddenFileInput = React.useRef(null);
  const { handleImage } = props;

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <ButtonLined className="active" onClick={handleClick} size={16} style={{ fontSize: '0.8rem', margin: '20px 20px 20px auto' }}>
        <Icon IconImg={generalIcons['upload-ic'].icon} />
        Upload Image
      </ButtonLined>
      <input type="file" ref={hiddenFileInput} onChange={handleImage} style={{ display: 'none' }} />
    </>
  );
}

export default FileUploader;
