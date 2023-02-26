import React from 'react';
import SelectionTool from '../components/ConfigBar/Tools/SelectionTool';
import LineTool from '../components/ConfigBar/Tools/LineTool';
import PointTool from '../components/ConfigBar/Tools/PointTool';
import PentoolTool from '../components/ConfigBar/Tools/PentoolTool';
import GridTool from '../components/ConfigBar/Tools/GridTool';
import DiffTool from '../components/ConfigBar/Tools/DiffTool';

const selection = () => {
  return <SelectionTool />;
};

const line = () => {
  return <LineTool />;
};

const point = () => {
  return <PointTool />;
};

const pentool = () => {
  return <PentoolTool />;
};

const grid = () => {
  return <GridTool />;
};

const diff = () => {
  return <DiffTool />;
};

const toolTemplates = {
  selection,
  line,
  point,
  pentool,
  grid,
  diff,
};

export default toolTemplates;
