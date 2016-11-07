import React, {Component, PropTypes,} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './Header';

class App extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<div>
					<Header />
					{this.props.children}
				</div>
			</MuiThemeProvider>	
		);
	}
}

App.propTypes = {};
App.defaultProps = {};

export default (App);
