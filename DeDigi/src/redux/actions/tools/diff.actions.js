import { CHANGE_DIFF_VIEW, RESET_DIFF_VIEW, SET_COLOR_AND_SIZE } from '../../constants/tools/diff.constants';

const changeDiffView = (id) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_DIFF_VIEW,
      payload: {
        id,
      },
    });
  };
};

const resetDiffView = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_DIFF_VIEW,
    });
  };
};

const setColorAndSize = ({ colorCode, lineSize }) => {
  return (dispatch) => {
    dispatch({
      type: SET_COLOR_AND_SIZE,
      payload: {
        colorCode,
        lineSize,
      },
    });
  };
};

export { changeDiffView, resetDiffView, setColorAndSize };
