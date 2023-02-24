import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import colors from '../../constants/colors';

const HorizontalDiffViewContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const LineWithCircle = styled.div`
  position: absolute;
  width: calc(100% + 0rem);
  height: ${(props) => (props.lineSize ? `${props.lineSize}px` : '3px')};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${(props) => (props.colorCode ? props.colorCode : colors.primary)};
  border-radius: 50px;
`;

export default function HorizontalDiffView() {
  const { colorCode, lineSize } = useSelector((state) => state.diffReducer);

  return (
    <HorizontalDiffViewContainer>
      <LineWithCircle colorCode={colorCode} lineSize={lineSize} />
    </HorizontalDiffViewContainer>
  );
}
