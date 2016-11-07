import React, {Component, PropTypes,} from 'react';

import RaisedButton from 'material-ui/RaisedButton';

class Header extends Component {

	state = {
		name: 'asdf'
	};

	render() {
		return (
			<h1 className="title">Hello World what{this.state.name}sdf
				<p style={{color:'red'}}>hello</p>
				<RaisedButton label="Test" primary/>
			</h1>
		);
	}
}

Header.propTypes = {};
Header.defaultProps = {};

export default (Header);
