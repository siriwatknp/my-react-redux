import {createStore,applyMiddleware,compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';

import createReducer from './reducers'

const composeEnhancers =
	process.env.NODE_ENV !== 'production' &&
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// Specify here name, actionsBlacklist, actionsCreators and other options
		}) : compose;

export default function configureStore(initialState = {}, history){
	const middlewares = [
		thunk,
		routerMiddleware(history),
	];
	
	const store = createStore(
		createReducer(),
		initialState,
		composeEnhancers(applyMiddleware(...middlewares))
	);
	
	// Make reducers hot reloadable, see http://mxs.is/googmo
	/* istanbul ignore next */
	if (module.hot) {
		System.import('./reducers').then((reducerModule) => {
			const createReducers = reducerModule.default;
			const nextReducers = createReducers(store.asyncReducers);
			
			store.replaceReducer(nextReducers);
		});
	}
	
	// Initialize it with no other reducers
	store.asyncReducers = {};
	return store;
}