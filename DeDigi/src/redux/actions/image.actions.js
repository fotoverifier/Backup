import { CHANGE_CURRENT_IMAGE, RESET_CURRENT_IMAGE } from '../constants/image.constants';

const changeCurrentImage = (src) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_CURRENT_IMAGE,
      payload: { src },
    });
  };
};

const resetCurrentImage = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_CURRENT_IMAGE,
    });
  };
};

export { changeCurrentImage, resetCurrentImage };
