import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

const counter = (state = null,action) => {
	switch(action.type){
		default:
			return state;
	}
};

export default function createReducer(asyncReducers){
	return combineReducers({
		routing: routerReducer,
		counter,
		...asyncReducers
	})
}