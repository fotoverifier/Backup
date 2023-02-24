import diffType from '../../../constants/tools/diff';
import { CHANGE_DIFF_VIEW, RESET_DIFF_VIEW, SET_COLOR_AND_SIZE } from '../../constants/tools/diff.constants';

const initialData = {
  view: diffType.sideBySide,
  colorCode: null,
  lineSize: null,
};

const DiffReducer = (state = initialData, action) => {
  switch (action.type) {
    case CHANGE_DIFF_VIEW: {
      const { id } = action.payload;
      return {
        ...state,
        view: diffType[id],
      };
    }
    case RESET_DIFF_VIEW: {
      return {
        ...state,
        view: diffType.sideBySide,
      };
    }
    case SET_COLOR_AND_SIZE: {
      const { colorCode, lineSize } = action.payload;
      return {
        ...state,
        colorCode,
        lineSize,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default DiffReducer;
