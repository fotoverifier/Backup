import { CHANGE_CURRENT_IMAGE, RESET_CURRENT_IMAGE } from '../constants/image.constants';
import DemoImage from '../../assets/images/cat-drink.jpg';

const initialData = {
  src: null,
};

const userReducer = (state = initialData, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_IMAGE: {
      const { src } = action.payload;
      return {
        ...state,
        src,
      };
    }
    case RESET_CURRENT_IMAGE: {
      // const previousSrc = state.src;
      return {
        ...state,
        src: state.src || DemoImage,
      };
    }
    default:
      return { ...state };
  }
};

export default userReducer;
