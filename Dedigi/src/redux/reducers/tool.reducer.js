import { CHANGE_TOOL_VIEW, RESET_TOOL } from '../constants/tool.constants';
import { tools } from '../../constants/tools';

const initialData = {
  tool: tools.selection,
};

const toolReducer = (state = initialData, action) => {
  switch (action.type) {
    case CHANGE_TOOL_VIEW: {
      const { tool } = action.payload;
      return {
        ...state,
        tool: tools[tool],
      };
    }
    case RESET_TOOL: {
      return {
        ...state,
        tool: tools.selection,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default toolReducer;
