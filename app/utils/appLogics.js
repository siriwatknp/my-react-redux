import {createSelector} from 'reselect';
import {createActions} from 'redux-actions';
import cuid from 'cuid'
//lodash
import pick from 'lodash/pick';
import without from 'lodash/without';
import omit from 'lodash/omit';
import keys from 'lodash/keys';
import assign from 'lodash/assign';
import isEmpty from 'lodash/isEmpty';

import {db} from '../utils/firebase/config';

import {updateObject} from './functions/utilFunctions';

export const addUnderScore = (name) => {
	//support camel case name , ex. contactUs => contact_Us
	let rename = '';
	for(var i = 0; i < name.length; i++){
		if(name[i] == name[i].toUpperCase()){
			rename = rename + '_' + name[i]
		}else{
			rename = rename + name[i]
		}
	}
	return rename;
};

const createActionsByName = (name,other) => {
	const NAME = addUnderScore(name).toUpperCase();
	
	return {
		EDIT: `${NAME}_EDIT`,
		FETCH_REQUEST : `${NAME}_FETCH_REQUEST`,
		FETCH_SUCCESS : `${NAME}_FETCH_SUCCESS`,
		FETCH_FAILURE : `${NAME}_FETCH_FAILURE`,
		FETCH_ID_REQUEST : `${NAME}_FETCH_ID_REQUEST`,
		FETCH_ID_SUCCESS : `${NAME}_FETCH_ID_SUCCESS`,
		FETCH_ID_FAILURE : `${NAME}_FETCH_ID_FAILURE`,
		CREATE_REQUEST : `${NAME}_CREATE_REQUEST`,
		CREATE_SUCCESS : `${NAME}_CREATE_SUCCESS`,
		CREATE_FAILURE : `${NAME}_CREATE_FAILURE`,
		UPDATE_REQUEST : `${NAME}_UPDATE_REQUEST`,
		UPDATE_SUCCESS : `${NAME}_UPDATE_SUCCESS`,
		UPDATE_FAILURE : `${NAME}_UPDATE_FAILURE`,
		DELETE_REQUEST : `${NAME}_DELETE_REQUEST`,
		DELETE_SUCCESS : `${NAME}_DELETE_SUCCESS`,
		DELETE_FAILURE : `${NAME}_DELETE_FAILURE`,
		...other
	}
};

export const createAcsByName = (name,other) => {
	const actions = createActionsByName(name,other);

	return createActions(
		actions.EDIT,
		actions.FETCH_REQUEST,
		actions.FETCH_FAILURE,
		actions.FETCH_SUCCESS,
		actions.FETCH_ID_REQUEST,
		actions.FETCH_ID_SUCCESS,
		actions.FETCH_ID_FAILURE,
		actions.CREATE_REQUEST,
		actions.CREATE_FAILURE,
		actions.CREATE_SUCCESS,
		actions.UPDATE_REQUEST,
		actions.UPDATE_FAILURE,
		actions.UPDATE_SUCCESS,
		actions.DELETE_REQUEST,
		actions.DELETE_FAILURE,
		actions.DELETE_SUCCESS,
	)
};

const fetchFireBase = ({dispatch,folder = '/',name,id,request,success,failure}) => {
	dispatch(request());
	return db.ref(`${folder}/${name}${id ? `/${id}`:''}`).once('value')
		.then(snapshot => {
			return dispatch(success(snapshot.val()))
		},err => {
			console.log(err);
			return dispatch(failure(err.message))
		})
};

export const fetchDataByName = ({folder = '/',name}) => dispatch => {
	const acs = createAcsByName(name);
	return fetchFireBase({
		dispatch,
		folder,
		name,
		request:acs[`${name}FetchRequest`],
		success:acs[`${name}FetchSuccess`],
		failure:acs[`${name}FetchFailure`]
	})
};

export const fetchIdByName = ({folder = '/',name,id}) => dispatch => {
	const acs = createAcsByName(name);
	return fetchFireBase({
		dispatch,
		folder,
		name,
		request:acs[`${name}FetchIdRequest`],
		success:acs[`${name}FetchIdSuccess`],
		failure:acs[`${name}FetchIdFailure`]
	})
};

export const createDataByName = ({folder = '/',name,body}) => dispatch => {
	const acs = createAcsByName(name);
	if(!body || isEmpty(body)){
		return dispatch(acs[`${name}CreateFailure`]('body is empty'))
	}else{
		const newKey = cuid();
		let updates = {};
		updates[`${folder}/${newKey}`] = assign(body,{id:newKey,lastUpdated:Date.now()});
		dispatch(acs[`${name}CreateRequest`])();
		return db.ref().update(updates, err => {
			if(!err){
				return dispatch(acs[`${name}CreateSuccess`](newKey))
			}else{
				return dispatch(acs[`${name}CreateFailure`](err.message))
			}
		})
	}
};

export const updateDataByName = ({folder = '/',name,body}) => dispatch => {
	const acs = createAcsByName(name);
	if(!body || isEmpty(body) || !body.id){
		return dispatch(acs[`${name}UpdateFailure`]('body is empty || no body.id'))
	}else{
		dispatch(acs[`${name}CreateRequest`])();
		return db.ref(`${folder}/${name}/${body.id}`).set(assign(body,{lastUpdated:Date.now()}), err => {
			if(!err){
				return dispatch(acs[`${name}UpdateSuccess`](body.id))
			}else{
				return dispatch(acs[`${name}UpdateFailure`](err.message))
			}
		})
	}
};

export const deleteDataByName = ({folder = '/',name,id}) => dispatch => {
	const acs = createAcsByName(name);
	if(!id){
		return dispatch(acs[`${name}DeleteFailure`]('id is undefined'))
	}else{
		dispatch(acs[`${name}DeleteRequest`])();
		return db.ref(`${folder}/${name}/${id}`).remove(err => {
			if(!err){
				return dispatch(acs[`${name}DeleteSuccess`](id))
			}else{
				return dispatch(acs[`${name}DeleteFailure`](err.message))
			}
		})
	}
};


//can select reducer from selects, ex. selects = ['ids','fetchStatus']
export const createReducersByName = (name,selects = []) => {
	const actions = createActionsByName(name);
	const reducers = {
		ids:(state = [],action) => {
			switch (action.type){
				case actions.FETCH_SUCCESS:
					return keys(action.payload);
				case actions.DELETE_SUCCESS:
					return without(state,action.payload);
				default:
					return state
			}
		},
		byIdObject:(state = {},action) => {
			switch (action.type){
				case actions.FETCH_SUCCESS:
					return updateObject(state,action.payload);
				case actions.DELETE_SUCCESS:
					return omit(state,action.payload);
				default:
					return state
			}
		},
		editObject:(state = {},action) => {
			switch (action.type){
				case actions.EDIT:
				case actions.FETCH_ID_SUCCESS:
					return action.payload;
				default:
					return state
			}
		},
		...createStatusByName(['fetch','fetchId','create','update','delete'],actions)
	};
	
	if(selects.length){
		return pick(reducers,selects)
	}
	return reducers
};

///status = ['fetch','create','update','delete']
const createStatusByName = (status = [],actions) => {
	const result = {};
	status.forEach(status => {
		result[`${status}Status`] = (state = false,action) => {
			const string = addUnderScore(status).toUpperCase();
			switch (action.type){
				case actions[`${string}_REQUEST`]:
					return true;
				case actions[`${string}_FAILURE`]:
					return action.payload;
				case actions[`${string}_SUCCESS`]:
					return false;
				default:
					return state;
			}
		}
	});
	return result
};

export const createSelectorsByName = (name,cb) => (namePrefix = false) => (state,ownProps) => {
	//state must be a resource state
	const getResources = createSelector(
		[(resrc) => resrc.ids, (resrc) => resrc.byIdObject],
		(ids,byIdObject) => ids.map( id => byIdObject[id] )
	);
	const getEditObject = (resrc) => resrc.editObject;
	const getFetchStatus = (resrc) => resrc.fetchStatus;
	const getFetchIdStatus = (resrc) => resrc.fetchIdStatus;
	const getCreateStatus = (resrc) => resrc.createStatus;
	const getUpdateStatus = (resrc) => resrc.updateStatus;
	const getDeleteStatus = (resrc) => resrc.deleteStatus;
	return {
		[name]:getResources(cb(state)),
		[namePrefix ? `${name}EditObject` : 'editObject']:getEditObject(cb(state)),
		[namePrefix ? `${name}FetchStatus` : 'fetchStatus']:getFetchStatus(cb(state)),
		[namePrefix ? `${name}FetchIdStatus` : 'fetchIdStatus']:getFetchIdStatus(cb(state)),
		[namePrefix ? `${name}CreateStatus` : 'createStatus']:getCreateStatus(cb(state)),
		[namePrefix ? `${name}UpdateStatus` : 'updateStatus']:getUpdateStatus(cb(state)),
		[namePrefix ? `${name}DeleteStatus` : 'deleteStatus']:getDeleteStatus(cb(state))
	}
};












