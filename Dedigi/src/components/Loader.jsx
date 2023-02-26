import React from 'react';
import styled from 'styled-components';

const LoaderComponent = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.8) url('http://i.stack.imgur.com/FhHRx.gif') 50% 50% no-repeat;
`;

export default function Loader() {
  return <LoaderComponent />;
}
