/* eslint-disable no-console */
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import ConfigContainer from '../../../pages/MainPage/ConfigContainer';
import ButtonGroup from '../../ButtonGroup';
import ColorPickerContainer from '../../ColorPickerContainer';
import { changeDiffView, setColorAndSize } from '../../../redux/actions/tools/diff.actions';

const FootnoteText = styled.p`
  margin-top: 0.5rem;
  font-weight: 200;
  font-style: italic;
  font-size: 0.8rem;
`;

export default function DiffTool() {
  const dispatch = useDispatch();

  function SideBySide() {
    dispatch(changeDiffView('sideBySide'));
  }

  function Vertical() {
    dispatch(changeDiffView('vertical'));
  }

  function Horizontal() {
    dispatch(changeDiffView('horizontal'));
  }

  const functionList = [
    {
      id: 'side-by-side',
      fnName: 'Side by side',
      onClick: SideBySide,
    },
    {
      id: 'vertical',
      fnName: 'Vertical*',
      onClick: Vertical,
    },
    {
      id: 'horizontal',
      fnName: 'Horizontal*',
      onClick: Horizontal,
    },
  ];

  function getColorAndSize(colorCode, lineSize) {
    dispatch(setColorAndSize({ colorCode, lineSize }));
  }

  return (
    <ConfigContainer title="before/after" onOff style={{ borderBottom: 'none' }}>
      <ButtonGroup group={functionList} />
      <br />
      <ColorPickerContainer onColorAndSizeChosen={getColorAndSize} />
      <FootnoteText>*Vertical and Horizontal mode is not available yet</FootnoteText>
    </ConfigContainer>
  );
}
