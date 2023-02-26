import SET_IS_LOADING from '../constants/method.constants';

const setIsLoading = (boolVal) => {
  return (dispatch) => {
    dispatch({
      type: SET_IS_LOADING,
      payload: {
        isLoading: boolVal,
      },
    });
  };
};

export default setIsLoading;
