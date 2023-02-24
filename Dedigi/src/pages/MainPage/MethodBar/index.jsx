/* eslint-disable func-names */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ELAConfigContainer from './MethodContainer/ELAConfigContainer';
import GhostConfigContainer from './MethodContainer/GhostConfigContainer';
import ArtifactConfigContainer from './MethodContainer/ArtifactConfigContainer';
import MedianNoiseConfigContainer from './MethodContainer/MedianNoiseConfigContainer';
import ExifConfigContainer from './MethodContainer/ExifConfigContainer';
import MethodController from '../../../models/MethodStrategy';
import JPEGGhost from '../../../models/methods/JPEGGhost';
import NoiseMedian from '../../../models/methods/NoiseMedian';
import ELA from '../../../models/methods/ELA';
import CFAArtifact from '../../../models/methods/CFAArtifact';
import { resetTool } from '../../../redux/actions/tool.actions';
import RightIcon from '../../../assets/images/arrows-right-ic.svg';
import setIsLoading from '../../../redux/actions/method.actions';

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
  width: 17vw;
  min-width: 12rem;
  height: fit-content;
  height: 100vh;
  height: 100vh;
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

const methodType = {
  ghost: new JPEGGhost(),
  noisemedian: new NoiseMedian(),
  ela: new ELA(),
  demosaicing: new CFAArtifact(),
};

export default function MethodBar() {
  const [isClosed, setIsClosed] = useState(false);
  const methodStrategy = new MethodController();
  const { tool } = useSelector((state) => state.toolReducer);
  const dispatch = useDispatch();

  async function executeMethod(type, args) {
    if (tool.name === 'line') {
      dispatch(resetTool());
    }
    methodStrategy.strategy = methodType[type];
    dispatch(setIsLoading(true));
    setTimeout(async function () {
      await methodStrategy.execMethod(args);
      dispatch(setIsLoading(false));
    }, 0);
  }

  return (
    <MethodSidebar isClosed={isClosed}>
      <MethodSidebarContainer>
        <MethodSidebarInner>
          <ELAConfigContainer executeMethod={executeMethod} />
          <GhostConfigContainer executeMethod={executeMethod} />
          <ArtifactConfigContainer executeMethod={executeMethod} />
          <MedianNoiseConfigContainer executeMethod={executeMethod} />
          <ExifConfigContainer />
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
