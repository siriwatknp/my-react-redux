import React ,{Component,PropTypes} from 'react';
import find from 'lodash/find';
import some from 'lodash/some';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';

export const createStylesObject = (fields=[]) => {
	return {
		key:'styles',
		label:'Styles',
		fields:fields
	}
};

export const findNameById = (array,id) => {
	if(id){
		return find(array,{id:id}) ? find(array,{id:id}).name : 'Not Found'
	}else{
		return 'Nothing Selected'
	}
};

export const moveBefore = (array,index) => {
	if(index > 0){
		return [...array.slice(0,index - 1),array[index],array[index - 1],...array.slice(index + 1)]
	}
	return array
};

export const moveAfter = (array,index) => {
	if(index < array.length - 1){
		return [...array.slice(0,index),array[index + 1],array[index],...array.slice(index + 2)]
	}
	return array
};

export const checkSomeEmpty = (array) => {
	return some(array, item => isEmpty(item))
};

export const createFlex = (justify = 'center',align = 'center',direction = 'row') => ({display:'flex',justifyContent:justify,alignItems:align,flexDirection:direction});

export const addItemToArray = (array,item,index = array.length - 1) => {
	if(index > array.length - 1){
		return console.log('index should < array.length');
	}
	return [...array.slice(0,index + 1),item,...array.slice(index + 1)]
};

export const removeItemArrayByIndex = (array,index) => {
	if(index < 0 || index > array.length - 1){
		return console.log('index should < array.length');
	}
	return [...array.slice(0,index),...array.slice(index + 1)]
};

export const removeItemArrayById = (array,id,key = 'id') => {
	return array.filter(item => isObject(item) ? item[key] != id : item != id)
};

export const updateItemArrayById = (array, id, updateItemCallback) => {
	return array.map(item => {
		if(item.id == id){
			return updateItemCallback(item)
		}
		return item
	})
};

export const updateItemArrayByIndex = (array,index,updateItemCallback) => {
	return array.map((item,i) => {
		if(i == index){
			return updateItemCallback(item)
		}
		return item
	})
};

export const updateObject = (oldObject, newValues) => {
	return Object.assign({},oldObject,newValues);
};

export const updateAllItemArray = (array,callback) => {
	return array.map(item => callback(item))
};