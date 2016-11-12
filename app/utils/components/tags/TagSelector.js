import React, {Component, PropTypes,} from 'react';

import {tagType} from '../../constants/data';

//tags
import TagInput from './TagInput';
import TagSelect from './TagSelect';
import TagSwitch from './TagSwitch';

class TagSelector extends Component {
	
	renderByTag = (type) => {
		const {onChange,mode,label,value,options,placeholder} = this.props;
		const input = {onChange,mode,label,value,placeholder};
		const select = {onChange,label,options};
		const switchProps = {onChange,mode,label,options};
		switch (type){
			case tagType.input:
				return <TagInput {...input}/>;
			case tagType.select:
				return <TagSelect {...select}/>;
			case tagType.switch:
				return <TagSwitch {...switchProps}/>
		}
	};
	
	render() {
		const {type} = this.props;
		return this.renderByTag(type)
	}
}

TagSelector.propTypes = {};
TagSelector.defaultProps = {};

export default (TagSelector);
