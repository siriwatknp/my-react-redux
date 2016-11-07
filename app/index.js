import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {Router,browserHistory} from 'react-router';
import {syncHistoryWithStore} from "react-router-redux";
import configureStore from "./store";
import injectTapEventPlugin from "react-tap-event-plugin";
import createRoutes from "./routes";

injectTapEventPlugin();

const initialState = {};
const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const mountApp = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
		<Router 
			history={history}
			routes={createRoutes(store)}
		/>
	</Provider>,	
	mountApp
);

if (module.hot) {
	module.hot.accept('./front/App', () => {
		const NextApp = require('./front/App').default;
		ReactDOM.render(
			<NextApp />,
			mountApp
		);
	});
}