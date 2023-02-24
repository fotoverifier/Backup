import React from 'react';
import styled from 'styled-components';
import colors from '../constants/colors';

const ButtonItem = styled.button`
  background: ${colors.darkgray};
  color: ${colors.midgray};

  flex: 1;
  padding: 5px 10px;
`;

const ButtonGroupContainer = styled.div`
  border: 1px solid ${colors.midgray};
  border-radius: 6px;
  background: ${colors.darkgray};
  color: ${colors.midgray};

  display: flex;
  justify-content: space-between;
  flex-direction: row;

  & ${ButtonItem} {
    border-right: 1px solid ${colors.midgray};
  }

  & ${ButtonItem}:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  & ${ButtonItem}:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border-right: none;
  }
`;

export default function ButtonGroup(props) {
  const { group } = props;
  return (
    <ButtonGroupContainer>
      {group.map((item) => (
        <ButtonItem key={item.id} onClick={item.onClick}>
          {item.fnName}
        </ButtonItem>
      ))}
    </ButtonGroupContainer>
  );
}
