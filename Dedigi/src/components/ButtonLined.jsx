import React from 'react';
import styled from 'styled-components';
import colors from '../constants/colors';

const Button = styled.button`
  cursor: pointer;
  background: ${colors.darkgray};
  border: 1px solid ${colors.midgray};
  color: ${colors.midgray};
  padding: 10px 15px;
  border-radius: 4px;
  height: fit-content;
  display: flex;
  align-items: center;
  &:hover {
    background: #e0e0e0;
    border: 1px solid ${colors.white};
    color: ${colors.darkjean};
  }

  & svg {
    margin-right: ${(props) => (props.content === 'download' ? '0' : '0.5rem')};
  }
`;

export default function ButtonLined(props) {
  const { children, onClick, style, content } = props;

  return (
    <Button onClick={onClick} style={{ ...style }} content={content}>
      {children}
    </Button>
  );
}
