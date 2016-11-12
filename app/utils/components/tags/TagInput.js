import React, {Component, PropTypes,} from 'react';
import _ from 'lodash';

import {dataType} from '../../constants/data';

class TagInput extends Component {

	state = {
		value:'',
		mode:dataType.text
	};

	componentDidMount() {
		const {value,mode} = this.props;
		this.handleSetState(value,mode);
	}

	handleSetState = (value,mode) => {
		if(value){
			if(value.slice(-1) == '%' && _.isArray(mode)){
				this.setState({value:parseInt(value.slice(0,-1)),mode:dataType.percentage})
			}else if(_.isArray(mode)){
				this.setState({value,mode:dataType.number})
			}else{
				this.setState({value})
			}
		}else {
			if (_.isArray(mode)) {
				this.setState({mode: mode.length > 0 ? mode[0] : dataType.number})
			}else{
				this.setState({mode})
			}
		}
	};

	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({value:nextProps.value || ''})
	}

	chooseMinValue = (mode) => {
		switch (mode){
			case dataType.number:
				return 1;
			case dataType.percentage:
				return 0;
			default:
				return ''
		}
	};

	chooseMaxValue = (mode) => {
		switch (mode){
			case dataType.number:
				return '';
			case dataType.percentage:
				return 100;
			default:
				return ''
		}
	};

	handleChange = (value,mode) => {
		if(mode == dataType.percentage && value >= this.chooseMinValue(mode) && value <= this.chooseMaxValue(mode)){
			this.props.onChange(value + '%');
			this.setState({value})
		}else if(mode == dataType.number && value >= this.chooseMinValue(mode)){
			this.props.onChange(parseInt(value));
			this.setState({value})
		}else if(mode == dataType.text || mode == dataType.textarea){
			this.props.onChange(value);
			this.setState({value})
		}
	};

	handleModeChange = (mode) => {
		this.setState({mode})
	};

	render() {
		const {isExpanded,label,placeholder} = this.props;
		const modeProp = this.props.mode;
		const {value,mode} = this.state;
		return (
			<div className={`control ${isExpanded ? 'is-expanded':''}`}>
				{label && <label className="label">{label}</label>}
				<p className={`control ${_.isArray(modeProp) ? 'has-addons':''}`}>
					{_.isArray(modeProp) &&
						<span className="select">
							<select value={mode} onChange={(e) => this.handleModeChange(e.target.value)}>
								{modeProp.map((option,i) => {
									return(
										<option value={option} key={i}>{option == dataType.percentage ? '%' : option}</option>
									)
								})}
							</select>
						</span>
					}
					{
						modeProp == dataType.textarea ?
							<textarea
								value={value}
								className="textarea"
								placeholder={placeholder || label}
								onChange={(e) => this.handleChange(e.target.value,mode)}
							/>
						:
							<input
								value={value}
								className={`input`}
								placeholder={placeholder || label}
								type={mode == dataType.percentage ? dataType.number : mode}
								min={this.chooseMinValue(mode)}
								max={this.chooseMaxValue(mode)}
								onChange={(e) => this.handleChange(e.target.value,mode)}
							/>
					}
				</p>
			</div>
		);
	}
}

TagInput.propTypes = {
	mode:PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]),
	label:PropTypes.string,
	onChange:PropTypes.func,
	value:PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	])
};
TagInput.defaultProps = {
	mode:dataType.text,
};

export default (TagInput);
