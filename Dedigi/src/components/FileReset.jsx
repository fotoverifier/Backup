import React from 'react';
import ButtonLined from './ButtonLined';
import Icon from './Icon';
import { generalIcons } from '../constants/icons';

function FileReset(props) {
  const { handleReset } = props;

  return (
    <>
      <ButtonLined className="active" onClick={handleReset} size={16} style={{ fontSize: '0.8rem', margin: '20px 20px 20px auto' }}>
        <Icon IconImg={generalIcons['refresh-ic'].icon} />
        Reset Image
      </ButtonLined>
    </>
  );
}

export default FileReset;
