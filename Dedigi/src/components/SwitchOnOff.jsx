import React from 'react';
import styled from 'styled-components';
import colors from '../constants/colors';

const OnOffSwitch = styled.button`
  color: ${colors.white};
`;

export default function SwitchOnOff(props) {
  const { onSwitch } = props;
  return (
    <div>
      <OnOffSwitch type="button" onClick={onSwitch}>
        Switch
      </OnOffSwitch>
    </div>
  );
}
