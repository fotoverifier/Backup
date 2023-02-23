import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import DemoImage from '../../assets/images/cat-drink.jpg';
import FileDownload from '../../components/FileDownload';
import FileReset from '../../components/FileReset';
import FileUploader from '../../components/FileUploader';
import { changeCurrentImage, resetCurrentImage } from '../../redux/actions/image.actions';
import createHistograms from '../../utils/imagehistogramsdemo';

const ImageSpaceContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FileButtonGroup = styled.div`
  display: flex;
  width: fit-content;
  align-self: flex-end;
`;

const ImageFlexSpace = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ImageSpace = styled.div`
  display: flex;
  position: relative;
  width: fit-content;
  height: fit-content;

  margin: 0 auto;
  align-items: center;
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
  max-width: 45%;
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
  position: absolute;
`;

const CanvasFrame = styled(Frame)`
  position: relative;
  width: 65%;
`;

export default function ImageContainer() {
  const { cv } = window;
  const dispatch = useDispatch();
  const toolReducer = useSelector((state) => state.toolReducer);
  const imageReducer = useSelector((state) => state.imageReducer);
  const currentToolReducer = useSelector((state) => {
    if (toolReducer.tool?.reducer) return state[toolReducer.tool.reducer];
    return null;
  });

  const canvasTmp = useRef(null);
  const [, setSize] = useState({
    height: 1000,
    width: 1000,
  });
  const [{ alt }] = useState({
    src: DemoImage,
    alt: 'Upload an Image',
  });

  const handleImage = (event) => {
    if (event.target.files[0]) {
      const fr = new FileReader();
      fr.onload = () => {
        dispatch(changeCurrentImage(fr.result));
      };
      fr.readAsDataURL(event.target.files[0]);
    }
  };

  const getCurrentImage = () => {
    const img = document.getElementById('originalImage');

    if (img.src) {
      const srcMat = cv.imread('originalImage');
      const desMat = srcMat.clone();
      cv.imshow('imageCanvas', desMat);
      srcMat.delete();
    }
    setSize({
      width: img.width,
      height: img.height,
    });
  };

  const resetCurrent = async () => {
    dispatch(resetCurrentImage());
    getCurrentImage();
  };

  useEffect(() => {
    createHistograms(imageReducer.src || DemoImage);
  }, [imageReducer.src]);

  function download() {
    const link = document.createElement('a');
    link.download = 'DIF_result.png';
    link.href = document.getElementById('imageCanvas') ? document.getElementById('imageCanvas').toDataURL() : '';
    link.click();
  }

  return (
    <ImageSpaceContainer>
      <FileButtonGroup>
        <FileDownload handleDownload={download} />
        <FileReset handleReset={resetCurrent} />
        <FileUploader cv={cv} handleImage={handleImage} />
      </FileButtonGroup>
      <ImageFlexSpace>
        <ImageSpace>
          <OriginalFrame style={{ display: 'none' }}>
            <Image src={imageReducer.src || DemoImage} onLoad={getCurrentImage} alt={alt} id="originalImage" />
          </OriginalFrame>
          <CanvasFrame>
            <canvas ref={canvasTmp} style={{ width: '100%', height: '100%' }} id="imageCanvas" />
          </CanvasFrame>
          {/* Utility: Diff */}
          <>{currentToolReducer?.view?.template({ getCurrentImage, alt })}</>
        </ImageSpace>
      </ImageFlexSpace>
    </ImageSpaceContainer>
  );
}
