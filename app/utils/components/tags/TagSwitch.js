import React, {Component, PropTypes,} from 'react';
import _ from 'underscore';

import Toggle from 'material-ui/Toggle';
import {dataType} from '../../constants/data';

class TagSwitch extends Component {

	state = {
		value: ''
	};

	componentDidMount() {
		const {value} = this.props;
		if(value || value == 0 || _.isBoolean(value)){
			this.setState({value})
		}
	}

	componentWillReceiveProps(nextProps, nextContext) {
		const {value} = nextProps;
		if(value || value == 0 || _.isBoolean(value)){
			this.setState({value})
		}
	}

	handleSwitch = (value,mode) => {
		if(mode == dataType.radio){
			this.setState({value});
			this.props.onChange(value)
		}else if(mode == dataType.checkbox || mode == dataType.toggle){
			this.setState({value:!value});
			this.props.onChange(!value)
		}
	};

	render() {
		const {label,options,mode} = this.props;
		const {value} = this.state;
		if(mode == dataType.radio){
			return(
				<p className="control">
					<label className="label">{label}</label>
					{options.map((option,i) => {
						return(
							<label key={i} className="radio">
								<input
									type="radio"
									checked={value == option.value}
									value={option.value}
									onChange={(e) => this.handleSwitch(e.target.value,mode)}
								/> {option.label}
							</label>
						)
					})}
				</p>
			)
		}else if(mode == dataType.checkbox){
			return(
				<div className="control">
					<Toggle label={label} toggled={value || false} onToggle={() => this.handleSwitch(value,mode)}/>
				</div>
			)
		}
	}
}

TagSwitch.propTypes = {
	options:PropTypes.arrayOf(PropTypes.object),
	label:PropTypes.string.isRequired,
	mode:PropTypes.string.isRequired,
	value:PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.string
	]).isRequired
};
TagSwitch.defaultProps = {
	options:[],
	label:'Switch',
	mode:dataType.checkbox
};

export default (TagSwitch);
