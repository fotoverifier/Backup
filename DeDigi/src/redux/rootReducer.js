import { combineReducers } from 'redux';
import methodReducer from './reducers/method.reducer';
import imageReducer from './reducers/image.reducer';
import toolReducer from './reducers/tool.reducer';
import diffReducer from './reducers/tools/diff.reducer';
import lineReducer from './reducers/tools/lines.reducer';

const rootReducer = combineReducers({
  methodReducer,
  toolReducer,
  diffReducer,
  imageReducer,
  lineReducer,
});

export default rootReducer;
