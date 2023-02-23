/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Stage, Layer } from 'react-konva';
import DemoImage from '../../assets/images/cat-drink.jpg';
import FileUploader from '../../components/FileUploader';
import FileReset from '../../components/FileReset';
import { changeCurrentImage, resetCurrentImage } from '../../redux/actions/image.actions';

import DummyImage from './DummyImage';
import Lines from './DummyImage/Line';
import { selectALine, setALine } from '../../redux/actions/tools/lines.actions';
import FileDownload from '../../components/FileDownload';

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

const initialImage = [
  {
    x: 10,
    y: 10,
    scaleX: 1,
    scaleY: 1,
    id: 'img1',
  },
];

const StageContainer = styled(Stage)`
  display: flex;
  flex: 1;
  height: 100%;
  backgroundcolor: #f0e3ca;
`;

export default function ImageContainer() {
  const { cv } = window;
  const dispatch = useDispatch();
  const imageReducer = useSelector((state) => state.imageReducer);
  const { lines } = useSelector((state) => state.lineReducer);
  const [images, setImages] = useState(initialImage);
  const [selectedId, selectShape] = useState(null);

  const handleImage = (event) => {
    if (event.target.files[0]) {
      const fr = new FileReader();
      fr.onload = () => {
        dispatch(changeCurrentImage(fr.result));
      };
      fr.readAsDataURL(event.target.files[0]);
    }
  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      dispatch(selectALine(null));
    }
  };

  const resetCurrent = () => {
    dispatch(resetCurrentImage());
  };

  function download() {
    const link = document.createElement('a');
    link.download = 'DIF_result.png';
    link.href = document.querySelector('#image--line__container canvas').toDataURL() || imageReducer.src || DemoImage;
    link.click();
  }

  return (
    <ImageSpaceContainer>
      <FileButtonGroup>
        <FileDownload handleDownload={download} />
        <FileReset handleReset={resetCurrent} />
        <FileUploader cv={cv} handleImage={handleImage} />
      </FileButtonGroup>
      <ImageFlexSpace id="image--line__container">
        <StageContainer onMouseDown={checkDeselect} onTouchStart={checkDeselect} width="996" height="850">
          <Layer>
            {images.map((img, i) => {
              return (
                <DummyImage
                  key={i}
                  imageProp={imageReducer.src || DemoImage}
                  shapeProps={img}
                  isSelected={img.id === selectedId}
                  onSelect={() => {
                    selectShape(img.id);
                  }}
                  onChange={(newAttrs) => {
                    const imgs = images.slice();
                    imgs[i] = newAttrs;
                    setImages(imgs);
                  }}
                />
              );
            })}

            {lines.map((line, i) => {
              return (
                <Lines
                  key={i}
                  shapeProps={line}
                  isSelected={line.id === selectedId}
                  onSelect={() => {
                    selectShape(line.id);
                    dispatch(selectALine(line));
                  }}
                  onChange={(newAttrs) => {
                    dispatch(setALine(newAttrs, i));
                  }}
                />
              );
            })}
          </Layer>
        </StageContainer>
      </ImageFlexSpace>
    </ImageSpaceContainer>
  );
}
