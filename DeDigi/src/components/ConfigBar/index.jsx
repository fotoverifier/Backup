import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ConfigContainer from '../../pages/MainPage/ConfigContainer';
import { toolNames } from '../../constants/tools';
import toolsTemplate from '../../templates/Tools';
import LeftIcon from '../../assets/images/arrows-left-ic.svg';
import Histogram from './Histogram';

const ConfigSidebar = styled.div`
  background-color: #1c173e;
  height: 100%;
  position: relative;
  max-width: ${(props) => (props.isClosed ? '0' : '500px')};
  transition: ease-in-out 0.6s;
`;

const ConfigSidebarContainer = styled.div`
  overflow: hidden;
  transition: 0.4s;

  height: 100%;
  position: relative;
`;

const ConfigSidebarInner = styled.div`
  height: 100%;
  overflow-y: scroll;
  width: 20vw;
  max-height: 100vh;
  min-width: 16rem;
`;

const ClosingBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10px;
`;

const CenteredIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: gray;
  color: white;
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ClosingButton = styled.button`
  position: absolute;
  background: white;
  top: 0;
  left: 0;
  transform: translateX(-100%);
  height: 100%;
`;

const ButtonImg = styled.img`
  width: 10px;
  transition: all 0.3s;
  transform: ${(props) => (props.isClosed ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export default function ConfigBar() {
  const [isClosed, setIsClosed] = useState(false);
  const { tool } = useSelector((state) => state.toolReducer);

  function renderToolConfigContainer() {
    const toolIdx = toolNames.findIndex((toolItem) => toolItem === tool.name);
    if (toolIdx === -1) return toolsTemplate.selection;
    return toolsTemplate[toolNames[toolIdx]]();
  }

  return (
    <ConfigSidebar isClosed={isClosed}>
      <ConfigSidebarContainer>
        <ConfigSidebarInner>
          <ConfigContainer title="histogram">
            <Histogram />
          </ConfigContainer>
          {tool.name === 'selection' ? <></> : <ConfigContainer title={tool.name}>{renderToolConfigContainer()}</ConfigContainer>}
        </ConfigSidebarInner>
      </ConfigSidebarContainer>
      <ClosingButton type="button" onClick={() => setIsClosed(!isClosed)}>
        <ClosingBar>
          <CenteredIcon>
            <ButtonImg src={LeftIcon} alt="left right arrow" isClosed={isClosed} />
          </CenteredIcon>
        </ClosingBar>
      </ClosingButton>
    </ConfigSidebar>
  );
}
