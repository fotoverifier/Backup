const toolNames = ['selection', 'line', 'pentool', 'point', 'grid', 'diff'];

const tools = {
  selection: {
    name: 'selection',
    icon: 'selection-ic',
    reducer: null,
  },
  line: {
    name: 'line',
    icon: 'line-ic',
    reducer: null,
  },
  pentool: {
    name: 'pentool',
    icon: 'pentool-ic',
    reducer: null,
  },
  point: {
    name: 'point',
    icon: 'point-ic',
    reducer: null,
  },
  grid: {
    name: 'grid',
    icon: 'grid-ic',
    reducer: null,
  },
  diff: {
    name: 'diff',
    icon: 'diff-ic',
    reducer: 'diffReducer',
  },
};

export { tools, toolNames };
