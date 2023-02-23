/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addALine, deleteALine } from '../../../redux/actions/tools/lines.actions';
import ButtonLined from '../../ButtonLined';
import Slider from '../../Slider';

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function LineTool() {
  const dispatch = useDispatch();
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [lineColor, setLineColor] = useState('#ffffff');

  const handleAddALine = () => {
    dispatch(addALine(strokeWidth, lineColor));
  };
  const handleDeleteALine = () => {
    dispatch(deleteALine());
  };

  const handleSetStrokeWidth = (_, value) => {
    setStrokeWidth(value);
  };

  return (
    <div>
      <ButtonGroup>
        <ButtonLined onClick={handleAddALine} style={{ marginRight: 20, marginBottom: 10 }}>
          Add a new line
        </ButtonLined>
        <ButtonLined onClick={handleDeleteALine}>Delete selected line</ButtonLined>
      </ButtonGroup>
      <div>
        <Slider
          paraName="strokeWidth"
          min={5}
          max={10}
          step={1}
          defaultValue={strokeWidth}
          onAfterChange={handleSetStrokeWidth}
          title="Stroke width"
        />
      </div>
    </div>
  );
}
