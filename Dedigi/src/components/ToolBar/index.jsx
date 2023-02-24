import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import IconButton from '../IconButton';
import IconLink from '../IconLink';
import { pageIcons, toolBarIcons } from '../../constants/icons';
import { changeToolView, resetTool } from '../../redux/actions/tool.actions';
import colors from '../../constants/colors';

const ToolSidebar = styled.div`
  background-color: #241c5c;
  overflow-y: scroll;
  overflow: inherit;

  padding: 0.8rem;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  & button {
    margin: 0.4rem 0;
  }
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconButtonHover = styled.div`
  position: relative;

  &::after {
    content: ${(props) => (props.iconName ? `"${props.iconName}"` : '')};
    position: absolute;
    width: fit-content;
    padding: 5px;
    color: ${colors.white};
    background: #6a6a6a;
    z-index: 999;
    top: 0%;
    left: calc(100% + 0.6rem);
    // transform: tanslateY(-50%);
    border-radius: 2px;

    opacity: 0;
    visibility: hidden;

    transition: ease-in-out 0.2s;
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
  }
`;

export default function ToolBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { tool } = useSelector((state) => state.toolReducer);
  function changeToolViewSidebar(args) {
    dispatch(changeToolView(args.iconName.split('-')[0]));
  }

  useEffect(() => {
    return () => {
      dispatch(resetTool());
    };
  }, []);

  return (
    <ToolSidebar>
      {location.pathname === '/' ? (
        <CenteredContainer>
          {toolBarIcons.map((icon) => {
            return (
              <IconButtonHover key={icon.iconName} iconName={icon.alt}>
                <IconButton
                  IconImg={icon.icon}
                  iconName={icon.iconName}
                  isHoverable
                  onClick={changeToolViewSidebar}
                  isActive={icon.iconName.split('-')[0] === tool.name}
                />
              </IconButtonHover>
            );
          })}
        </CenteredContainer>
      ) : (
        <div />
      )}
      <CenteredContainer>
        {pageIcons.map((icon) => (
          <IconLink to={icon.pathLink} IconImg={icon.icon} key={icon.iconName} iconName={icon.iconName} isHoverable />
        ))}
      </CenteredContainer>
    </ToolSidebar>
  );
}
