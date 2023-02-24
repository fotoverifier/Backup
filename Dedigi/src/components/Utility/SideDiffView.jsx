import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import DemoImage from '../../assets/images/cat-drink.jpg';

const SideDiffViewContainer = styled.div`
  position: relative;
  height: 100%;
  width: 65%;
`;

const Image = styled.img`
  display: block;
  max-width: 100%;
  max-height: 1000px;
  width: auto;
  height: auto;
`;

const Frame = styled.div`
  margin: 0 auto;
  width: fit-content;
  height: fit-content;
  pointer-events: none;
  max-width: 50%;
  border: solid 3px #fff;
  border-radius: 4px;

  & canvas {
    display: flex;
  }

  @media (min-width: 768px) {
    max-width: 100%;
  }
`;

const OriginalFrame = styled(Frame)`
  position: relative;
`;

export default function SideDiffView(props) {
  const { alt } = props;
  const imageReducer = useSelector((state) => state.imageReducer);

  return (
    <SideDiffViewContainer>
      <OriginalFrame>
        <Image src={!imageReducer.src ? DemoImage : imageReducer.src} alt={alt} id="originalImage2" />
      </OriginalFrame>
    </SideDiffViewContainer>
  );
}
