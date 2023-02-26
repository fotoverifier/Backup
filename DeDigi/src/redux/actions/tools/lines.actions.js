import {
  LINES_ADD_A_LINE,
  LINES_DELETE_A_LINE,
  LINES_SET_A_LINE,
  LINES_SELECT_A_LINE,
  LINES_CLEAR_ALL_LINES,
} from '../../constants/tools/lines.constants';

const addALine = (strokeWidth, lineColor) => {
  return (dispatch) => {
    dispatch({
      type: LINES_ADD_A_LINE,
      payload: {
        strokeWidth,
        lineColor,
      },
    });
  };
};

const deleteALine = () => {
  return (dispatch) => {
    dispatch({
      type: LINES_DELETE_A_LINE,
      payload: {},
    });
  };
};

const setALine = (attributes, idx) => {
  return (dispatch) => {
    dispatch({
      type: LINES_SET_A_LINE,
      payload: {
        attributes,
        idx,
      },
    });
  };
};

const selectALine = (selectedLine) => {
  return (dispatch) => {
    dispatch({
      type: LINES_SELECT_A_LINE,
      payload: {
        selectedLine,
      },
    });
  };
};

const clearAllLines = () => {
  return (dispatch) => {
    dispatch({
      type: LINES_CLEAR_ALL_LINES,
      payload: {},
    });
  };
};

export { addALine, deleteALine, setALine, selectALine, clearAllLines };
