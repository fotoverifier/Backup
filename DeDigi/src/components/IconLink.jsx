import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../constants/colors';

const Button = styled.button`
  display: flex;
  width: auto;
  height: 1.8rem;
  & svg,
  & path,
  & ellipse,
  & g,
  & rect {
    transition: 0.3s;
  }
`;

const CustomNavLink = styled(NavLink)`
  & ${Button}:hover, &.active ${Button} {
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

export default function IconLink(props) {
  const { IconImg, iconName, to } = props;
  IconImg.defaultProps = {
    size: 24,
    style: {},
    className: '',
  };

  return (
    <CustomNavLink exact to={to}>
      <Button type="button" iconName={iconName}>
        <IconImg />
      </Button>
    </CustomNavLink>
  );
}
