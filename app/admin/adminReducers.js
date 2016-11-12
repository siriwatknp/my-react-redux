import {combineReducers} from 'redux';
import {resrcs} from '../utils/constants/environment';
import brandsReducer from './brands/brandsLogics';

export default combineReducers({
	[resrcs.brands]:brandsReducer
})