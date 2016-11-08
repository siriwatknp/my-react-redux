import React from 'react';
import {Route, IndexRoute, IndexRedirect, Redirect} from 'react-router';

import App from './front/App';

export default function createRoutes(store){
	return(
		<Route 
			path="/"
			component={App}
			children={[
				
			]}
		/>
	)
}