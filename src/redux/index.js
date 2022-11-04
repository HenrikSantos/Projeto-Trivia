import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import rootreducer from './reducers';

const store = createStore(
  rootreducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

if (window.Cypress) {
  window.store = store;
}

export default store;
