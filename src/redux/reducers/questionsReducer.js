import { ANSWER_API_ERROR, SAVE_ANSWER } from '../action';

const INITIAL_STATE = {
  response_code: 0,
  results: [],
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_ANSWER:
    return {
      ...state,
      ...action.payload,
    };
  case ANSWER_API_ERROR:
    return {
      ...state,
      response_code: 3,
      results: [],
    };
  default: return state;
  }
};

export default questionsReducer;
