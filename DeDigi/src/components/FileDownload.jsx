import React from 'react';
import ButtonLined from './ButtonLined';
import Icon from './Icon';
import { generalIcons } from '../constants/icons';

function FileDownload(props) {
  const { handleDownload } = props;

  return (
    <>
      <ButtonLined
        className="active"
        onClick={handleDownload}
        size={16}
        style={{ fontSize: '0.8rem', margin: '20px 20px 20px 20px' }}
        content="download"
      >
        <Icon IconImg={generalIcons['download-ic'].icon} />
      </ButtonLined>
    </>
  );
}

export default FileDownload;
