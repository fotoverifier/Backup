import {
  LINES_ADD_A_LINE,
  LINES_DELETE_A_LINE,
  LINES_CLEAR_ALL_LINES,
  LINES_SELECT_A_LINE,
  LINES_SET_A_LINE,
} from '../../constants/tools/lines.constants';

const initialData = {
  lines: [],
  images: [],
  selectedLine: null,
};

const lineReducer = (state = initialData, action) => {
  switch (action.type) {
    case LINES_ADD_A_LINE: {
      const { strokeWidth, lineColor } = action.payload;
      const newLine = {
        id: `line${Math.floor(Math.random() * 1000) + 1}`,
        points: [100, 100, 350, 100],
        strokeWidth: parseInt(strokeWidth, 10),
        stroke: lineColor,
      };
      return { ...state, lines: [...state.lines, newLine] };
    }
    case LINES_DELETE_A_LINE: {
      if (state.selectedLine) {
        const { id } = state.selectedLine;
        const lines = [...state.lines];
        return { ...state, lines: lines.filter((line) => line.id !== id) };
      }
      return { ...state };
    }
    case LINES_SET_A_LINE: {
      const { attributes, idx } = action.payload;
      const aLines = [...state.lines].slice();
      aLines[idx] = { ...aLines[idx], attributes };
      return { ...state, lines: aLines };
    }
    case LINES_SELECT_A_LINE: {
      const { selectedLine } = action.payload;
      return { ...state, selectedLine };
    }
    case LINES_CLEAR_ALL_LINES: {
      return { ...state, lines: [] };
    }
    default: {
      return { ...state };
    }
  }
};

export default lineReducer;
