import React, {Component, PropTypes,} from 'react';
import Link from 'react-router/lib/Link';
import {withRouter} from 'react-router';
import upperFist from 'lodash/upperFirst';
import {resrcs,routes} from '../utils/constants/environment';

class AdminPanel extends Component {
	
	genList = (menus,activePath) => {
		return(
			<ul className="menu-list">
				{menus.map((menu,i) => {
					return(
						<li key={i} style={{padding:10}}>
							{this.genMenu(menu,activePath)}
							{menu.children && this.genList(menu.children,activePath)}
						</li>
					)
				})}
			</ul>
		)
	};
	
	genMenu = (menu,activePath) => {
		return menu.disabled ?
			<p className="menu-label">{menu.label}</p>
			:
			<Link
				to={menu.path}
				className={activePath.indexOf(menu.activePath) != -1 ? `is-active` : ``}
			>
				{menu.label}
			</Link>
	};
	
	render() {
		const {activePath} = this.props;
		const menus = [
			{label:upperFist(resrcs.brands),path:routes.admin.brands,activePath:resrcs.brands},
			{label:upperFist(resrcs.products),path:routes.admin.products,activePath:resrcs.products}
		];
		return (
			<aside className="menu">
				{this.genList(menus,activePath)}
			</aside>
		);
	}
}

AdminPanel.propTypes = {};
AdminPanel.defaultProps = {};

export default withRouter(AdminPanel);
