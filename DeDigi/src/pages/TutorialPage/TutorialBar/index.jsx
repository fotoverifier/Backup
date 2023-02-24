import React, { useState } from 'react';
import styled from 'styled-components';
import RightIcon from '../../../assets/images/arrows-right-ic.svg';
import TutorialSelector from './TutorialSelector';

const MethodSidebar = styled.div`
  background-color: #1c173e;
  height: 100%;
  position: relative;
  max-width: ${(props) => (props.isClosed ? '0' : '500px')};
  transition: ease-in-out 0.6s;
`;

const MethodSidebarContainer = styled.div`
  height: 100%;
  overflow: hidden;
  transition: 0.4s;
`;

const MethodSidebarInner = styled.div`
  background-color: #1c173e;
  padding: 1rem;
  width: 17vw;
  min-width: 12rem;
  height: fit-content;
  min-height: 100vh;
  overflow-y: scroll;
`;

const ClosingBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10px;
  cursor: pointer;
`;

const CenteredIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: gray;
  color: white;
  position: absolute;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ClosingButton = styled.button`
  position: absolute;
  background: white;
  top: 0;
  left: 100%;
  transform: translateX(0%);
  height: 100%;
  z-index: 9;
`;

const ButtonImg = styled.img`
  width: 10px;
  transition: all 0.3s;
  transform: ${(props) => (props.isClosed ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export default function MethodBar(props) {
  const [isClosed, setIsClosed] = useState(false);
  const { selected, setSelected } = props;

  return (
    <MethodSidebar isClosed={isClosed}>
      <MethodSidebarContainer>
        <MethodSidebarInner>
          <TutorialSelector selected={selected} setSelected={setSelected} />
        </MethodSidebarInner>
      </MethodSidebarContainer>
      <ClosingButton type="button" onClick={() => setIsClosed(!isClosed)}>
        <ClosingBar>
          <CenteredIcon>
            <ButtonImg src={RightIcon} alt="left right arrow" isClosed={isClosed} />
          </CenteredIcon>
        </ClosingBar>
      </ClosingButton>
    </MethodSidebar>
  );
}
