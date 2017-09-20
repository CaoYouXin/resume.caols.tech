import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import { fromLocalStorage, toLocalStorage } from '../utils';

import handle_bar from './handle_bar';
import gallery_show from './gallery_show';
import location from './location';
import cursor_coord from './cursor_coord';
import book_selector from './book_selector';
import app_landscape from './app_landscape';
import item_selector from './item_selector';
import details from './details';
import gallery from './gallery';
import matter from './matter';

export const configStore = () => {
  let middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  const store = createStore(combineReducers({
    matter,
    handle_bar,
    gallery_show,
    location,
    cursor_coord,
    book_selector,
    app_landscape,
    item_selector,
    details,
    gallery
  }), fromLocalStorage(), applyMiddleware(...middlewares));

  store.subscribe(throttle(() => {
    toLocalStorage(store.getState());
  }, 1000));

  return store;
}