import { ELA_CHANGE_VALUE, ELA_RESET_VALUE } from '../constants/ELA.constants';

function ELAChangeValue(values) {
  return (dispatch) => {
    dispatch({
      type: ELA_CHANGE_VALUE,
      payload: {
        quality: values.quality,
        errorScale: values.errorScale,
      },
    });
  };
}

function ELAResetValue() {
  return (dispatch) => {
    dispatch({
      type: ELA_RESET_VALUE,
    });
  };
}

export { ELAChangeValue, ELAResetValue };
