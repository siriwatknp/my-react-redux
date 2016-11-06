import React, {Component, PropTypes,} from 'react';


class Header extends Component {

	state = {
		name: 'GG'
	};

	render() {
		return (
			<h1 className="title">Hello World {this.state.name}</h1>
		);
	}
}

Header.propTypes = {};
Header.defaultProps = {};

export default (Header);
