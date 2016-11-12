import React, {Component, PropTypes,} from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';

class MuiTabs extends Component {

	static contextTypes = {
		router: PropTypes.object.isRequired
	};

	handleActive = (path) => {
		this.context.router.push(path)
	};

	render() {
		const {urls,index} = this.props;
		return (
			<Tabs value={index}>
				{urls.map((url,i) =>
					<Tab
						key={i}
						label={url.label}
						value={i}
						onActive={() => this.handleActive(url.path)}
					/>
				)}
			</Tabs>
		);
	}
}

MuiTabs.propTypes = {};
MuiTabs.defaultProps = {};

export default (MuiTabs);
