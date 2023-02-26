import { ELA_CHANGE_VALUE } from '../constants/ELA.constants';

const initialData = {
  quality: 50,
  errorScale: 10,
};

const ELAReducers = (state = initialData, action) => {
  switch (action.type) {
    case ELA_CHANGE_VALUE: {
      const { quality, errorScale } = action.payload;
      return { ...state, quality, errorScale };
    }
    default: {
      return { ...state };
    }
  }
};

export default ELAReducers;
