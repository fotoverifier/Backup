import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import colors from '../../constants/colors';

const VerticalDiffViewContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const LineWithCircle = styled.div`
  position: absolute;
  width: ${(props) => (props.lineSize ? `${props.lineSize}px` : '3px')};
  height: calc(100% + 4rem);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${(props) => (props.colorCode ? props.colorCode : colors.primary)};
  border-radius: 50px;
`;

export default function VerticalDiffView() {
  const { colorCode, lineSize } = useSelector((state) => state.diffReducer);

  return (
    <VerticalDiffViewContainer>
      <LineWithCircle colorCode={colorCode} lineSize={lineSize} />
    </VerticalDiffViewContainer>
  );
}
