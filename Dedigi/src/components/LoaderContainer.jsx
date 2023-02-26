import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoaderBoxContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotating = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderBox = styled.div`
  display: block;
  width: 40px;
  height: 40px;
  border: 2px solid white;
  position: absolute;
  transition: 0.1s;
  z-index: 9;
  animation: ${rotating} 2s linear infinite;
`;

export default function LoaderContainer() {
  return (
    <LoaderBoxContainer>
      <LoaderBox />
    </LoaderBoxContainer>
  );
}
