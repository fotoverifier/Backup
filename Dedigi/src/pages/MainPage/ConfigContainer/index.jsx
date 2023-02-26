/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../../constants/colors';

import Icon from '../../../components/Icon';
import SwitchOnOff from '../../../components/SwitchOnOff';
import { generalIcons } from '../../../constants/icons';

const DropDownContainer = styled.div`
  padding: 0.8rem;
  cursor: pointer;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ConfigBox = styled.div`
  border-bottom: 0.5px solid ${colors.midgray};
`;

const Title = styled.h5`
  font-weight: bold;
  color: ${colors.white};
  text-transform: uppercase;
`;

const ContentContainer = styled.div`
  padding: 0.8rem;
  padding-top: 0;
  display: ${(props) => (props.isClosed ? 'none' : 'block')};
`;

const Subtitle = styled.p`
  font-style: italic;
  text-transform: capitalize;
  color: ${colors.primary};
  margin-top: 0.5rem;
`;

const TooltipText = styled.div`
  position: absolute;
  background: ${colors.white};
  border-radius: 3px;
  padding: 0.6rem;
  font-size: 0.8rem;
  font-style: italic;
  color: ${colors.darkpurple};
  width: fit-content;
  left: 100%;
  top: 135%;
  transform: translateX(-100%);

  opacity: 0;
  visibility: hidden;
`;

const TooltipIcon = styled.div`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    border-width: 6px;
    border-style: solid;
    border-color: transparent transparent transparent transparent;
    left: 50%;
    top: 80%;
    transform: translateX(-50%);
  }
`;

const TooltipContainer = styled.div`
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  z-index: 9;

  &:hover {
    ${TooltipText} {
      opacity: 1;
      visibility: visible;
    }
    ${TooltipIcon}::after {
      border-color: transparent transparent white transparent;
    }
  }
`;

export default function ConfigContainer(props) {
  const { children, title, subtitle, tooltip, onOff, onSwitch, style } = props;
  const [isClosed, setIsClosed] = useState(false);
  const [icon, setIcon] = useState('angle-up-ic');

  function closeDropDown() {
    if (isClosed) {
      setIcon('angle-up-ic');
    } else {
      setIcon('angle-down-ic');
    }
    setIsClosed(!isClosed);
  }

  function getNewLine(str) {
    if (str.includes('\n')) {
      return str.split('\n').map((item, idx) => {
        return <p key={`tooltop-${subtitle}-${idx}`}>{item}</p>;
      });
    }
    return <p>{str}</p>;
  }

  return (
    <ConfigBox style={style}>
      <DropDownContainer type="button" onClick={closeDropDown}>
        <DropdownHeader>
          <Title>{title}</Title>
          {onOff ? <SwitchOnOff onSwitch={onSwitch} /> : <Icon IconImg={generalIcons[icon].icon} iconName={generalIcons[icon].iconName} />}
        </DropdownHeader>
        <FlexContainer>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
          {tooltip && (
            <TooltipContainer>
              <TooltipIcon>
                <Icon IconImg={generalIcons['info-ic'].icon} iconName={generalIcons['info-ic'].iconName} />
              </TooltipIcon>
              <TooltipText>{getNewLine(tooltip)}</TooltipText>
            </TooltipContainer>
          )}
        </FlexContainer>
      </DropDownContainer>
      {/* Content */}
      <ContentContainer isClosed={isClosed}>{children}</ContentContainer>
    </ConfigBox>
  );
}
