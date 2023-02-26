import { CHANGE_TOOL_VIEW, RESET_TOOL } from '../constants/tool.constants';

function changeToolView(toolName) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_TOOL_VIEW,
      payload: {
        tool: toolName,
      },
    });
  };
}

function resetTool() {
  return (dispatch) => {
    dispatch({
      type: RESET_TOOL,
    });
  };
}

export { changeToolView, resetTool };
