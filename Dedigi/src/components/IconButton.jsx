import React from 'react';
import styled from 'styled-components';
import colors from '../constants/colors';

const NormalButton = styled.button`
  display: flex;
`;

const Button = styled.button`
  display: flex;
  width: auto;
  height: 1.8rem;
  & svg,
  & path,
  & ellipse,
  & g,
  & rect {
    transition: ${(props) => (props.isNotTransitioned ? '0s' : '0.3s')};
  }
  &:hover,
  &.is__active {
    & svg {
      & path,
      & ellipse,
      & g {
        color: ${colors.primary};
        fill: ${(props) => {
          if (props.iconName === 'diff-ic') {
            return 'none';
          }
          if (props.iconName === 'grid-ic') {
            return 'none';
          }
          return colors.primary;
        }};
        stroke: ${(props) => props.iconName === 'grid-ic' && colors.primary};
      }
      & path#left-diff,
      & path#right-diff {
        fill: ${colors.primary};
      }
      & path#middle-diff {
        stroke: ${colors.primary};
      }
      & rect {
        fill: ${(props) => props.iconName === 'line-ic' && colors.primary};
      }
    }
  }
`;

export default function IconButton(props) {
  const { IconImg, iconName, onClick, isHoverable, isActive, isNotTransitioned } = props;
  IconImg.defaultProps = {
    size: 24,
    style: {},
    className: '',
  };

  function handleClick() {
    onClick({ iconName, IconImg, isHoverable });
  }

  if (isHoverable) {
    return (
      <Button type="button" iconName={iconName} className={isActive ? 'is__active' : ''} isNotTransitioned={isNotTransitioned}>
        {onClick ? <IconImg onClick={handleClick} /> : <IconImg />}
      </Button>
    );
  }

  return (
    <NormalButton type="button" iconName={iconName} className={isActive ? 'is__active' : ''}>
      {onClick ? <IconImg onClick={handleClick} /> : <IconImg />}
    </NormalButton>
  );
}
