import {combineReducers} from 'redux';
import {
	createReducersByName,
	createSelectorsByName,
	fetchDataByName,
	fetchIdByName,
	createDataByName,
	updateDataByName,
	deleteDataByName,
} from '../../utils/appLogics';

import {resrcs} from '../../utils/constants/environment';

export const fetchBrands = () => fetchDataByName({name:resrcs.brands});
export const fetchBrandId = (id) => fetchBrandId({name:resrcs.brands,id});
export const createBrand= (brand) => createDataByName({name:resrcs.brands,body:brand});
export const updateBrand = (brand) => updateDataByName({name:resrcs.brands,body:brand});
export const deleteBrand = (id) => deleteDataByName({name:resrcs.brands,id});

//selectors
const getBrandsState = (state) => state.admin[resrcs.brands];
export const getBrandValues = createSelectorsByName(resrcs.brands,getBrandsState);

export default combineReducers(createReducersByName(resrcs.brands))

