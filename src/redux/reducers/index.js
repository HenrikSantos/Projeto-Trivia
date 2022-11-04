import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  questions: questionsReducer,
});

export default rootReducer;
