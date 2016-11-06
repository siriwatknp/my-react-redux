import { AppContainer } from 'react-hot-loader'; // required
import React from 'react';
import ReactDOM from 'react-dom';

import App from './front/App';

const mountApp = document.getElementById('root');

ReactDOM.render(
	<AppContainer>
		<App />
	</AppContainer>,
	mountApp
);

if (module.hot) {
	module.hot.accept('./front/App', () => {
		var App = require('./front/App').default;
		ReactDOM.render(
			<AppContainer>
				<App />
			</AppContainer>	,
			mountApp
		);
	});
}