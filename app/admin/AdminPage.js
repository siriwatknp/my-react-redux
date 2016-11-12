import React, {Component, PropTypes,} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

import AdminPanel from './AdminPanel';

class AdminPage extends Component {
	state = {
		open:false,
	};
	
	handleToggle = () => {
		this.setState({
			open:!this.state.open,
		});
	};
	
	render() {
		const {open} = this.state;
		const {pathname} = this.props.location;
		const contentStyle = {marginLeft:open ? 256 : 0};
		return(
			<MuiThemeProvider>
				<div>
					<Drawer open={open}>
						<List>
							<ListItem
								disabled={true}
								leftAvatar={<Avatar src="" />}
							>
								Email
							</ListItem>
						</List>
						<Divider />
						<AdminPanel activePath={pathname}/>
					</Drawer>
					<div style={{transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',...contentStyle}}>
						<AppBar
							title="inCart-CMS"
							onLeftIconButtonTouchTap={this.handleToggle}
							iconElementRight={<FlatButton label={`Logout`}/>}
						/>
						<Paper style={{margin:15,padding:15}}>
							{this.props.children}
						</Paper>
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
}

AdminPage.propTypes = {};
AdminPage.defaultProps = {};

export default (AdminPage);
