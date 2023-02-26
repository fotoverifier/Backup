import React from 'react';
import styled from 'styled-components';
import colors from '../constants/colors';
import ButtonLined from './ButtonLined';

const ColorBtn = styled(ButtonLined)`
  color: ${colors.white};
`;

export default function ColorPickerContainer(props) {
  const { onColorAndSizeChosen } = props;

  function handleChooseColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    if (randomColor.split('').length !== 6) {
      onColorAndSizeChosen(`#fff`, 3);
    } else {
      onColorAndSizeChosen(`#${randomColor}`, 3);
    }
  }

  return (
    <div>
      <ColorBtn type="button" onClick={handleChooseColor}>
        Change line color (random)
      </ColorBtn>
    </div>
  );
}
