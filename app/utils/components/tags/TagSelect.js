import React, {Component, PropTypes,} from 'react';
import _ from 'underscore';

class TagSelect extends Component {

	state = {
		value: ''
	};

	componentDidMount() {
		const {value} = this.props;
		if(value || value == 0){
			this.setState({value})
		}
	}

	componentWillReceiveProps(nextProps, nextContext) {
		const {value} = nextProps;
		if(value || value == 0){
			this.setState({value})
		}
	}

	handleSelect = (value) => {
		this.props.onChange(value);
		this.setState({value})
	};

	render() {
		const {label,options} = this.props;
		const {value} = this.state;
		return (
			<div className="control">
				<label className="label">{label}</label>
				<p className="control">
					<span className="select">
						<select value={value || -1} onChange={(e) => this.handleSelect(e.target.value)}>
							<option value={-1} disabled>-- select an option --</option>
							{options.map((option,i) => {
								return(
									<option value={_.isObject(option) ? option.value : option} key={i}>
										{_.isObject(option) ? option.label : option}
									</option>
								)
							})}
						</select>
					</span>
				</p>
			</div>
		);
	}
}

TagSelect.propTypes = {
	options:PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	])),
	value:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
	label:PropTypes.string.isRequired,
};
TagSelect.defaultProps = {
	options:[],
	label:'input'
};

export default (TagSelect);
