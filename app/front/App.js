import React, {Component, PropTypes,} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './modules/Header';
import Footer from './modules/Footer';
import Content from './modules/Content';

class App extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<div>
					<Header />
					<Content />
					{this.props.children}
					<Footer />
				</div>
			</MuiThemeProvider>	
		);
	}
}

App.propTypes = {};
App.defaultProps = {};

export default (App);
