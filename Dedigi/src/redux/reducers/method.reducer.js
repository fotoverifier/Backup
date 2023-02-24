import SET_IS_LOADING from '../constants/method.constants';

const initialData = {
  isLoading: false,
};

const userReducer = (state = initialData, action) => {
  switch (action.type) {
    case SET_IS_LOADING: {
      const { isLoading } = action.payload;
      return {
        ...state,
        isLoading,
      };
    }
    default:
      return { ...state };
  }
};

export default userReducer;
