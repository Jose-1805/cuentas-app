import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import app from './app/reducer';
import fullLoader from './full_loader/reducer';

export default createStore(combineReducers({
	app,
	fullLoader
}), applyMiddleware(thunk));
